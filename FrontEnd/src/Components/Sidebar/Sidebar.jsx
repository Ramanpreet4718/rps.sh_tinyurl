import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { handleSignIn, handleSignUp, toggleDrawer } from '../../Redux/action';
import { Avatar, CircularProgress, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { isEmpty } from '../../utils/utils';
import URLList from './URLList';

export default function Sidebar() {
    const dispatch = useDispatch();
    let openDrawer = useSelector((store) => { return store.openDrawer });
    let drawerType = useSelector((store) => { return store.drawerType });
    let isAuth = useSelector((store) => { return store.isAuth });
    const handleDispatch = () => { dispatch(toggleDrawer(false)) };

    const [showPassword, setShowPassword] = useState(false);
    const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "" });
    const [passwordError, setPasswordError] = useState({ errorType: false, message: "", });
    const [emailError, setEmailError] = useState({ errorType: false, message: "", });
    const [userNameError, setUserNameError] = useState({ errorType: false, message: "", });
    const handleClickShowPassword = () => { setShowPassword(!showPassword); }
    const isLoading = useSelector((store) => { return store.isLoading; });

    const checkAndSend = () => {
        let { name, email, password } = userDetails;

        if (isEmpty(name)) {
            setUserNameError({
                ...userNameError,
                errorType: true,
                message: "UserName should not be empty",
            });
        } else {
            setUserNameError({
                errorType: false,
                message: "",
            });
        }

        if (password.length < 8) {
            setPasswordError({
                ...passwordError,
                errorType: true,
                message: "Password must be 8 characters long",
            });
        } else {
            setPasswordError({
                errorType: false,
                message: "",
            });
        }

        if (isEmpty(email)) {
            setEmailError({
                ...emailError,
                errorType: true,
                message: "Email should not be empty",
            });
        } else {
            if (email.indexOf("@") <= -1) {
                setEmailError({
                    ...emailError,
                    errorType: true,
                    message: "Please enter a valid email",
                });
            }
            else {
                setEmailError({
                    errorType: false,
                    message: "",
                });
            }
        }
    }

    useEffect(() => {
        if (drawerType === "signUp") {
            if (passwordError.errorType == false && emailError.errorType == false && userNameError.errorType == false) {
                dispatch(handleSignUp(userDetails));
            }
        }
        if (drawerType === "signIn") {
            console.log(passwordError.errorType, emailError.errorType);
            if (passwordError.errorType === false && emailError.errorType === false) {
                dispatch(handleSignIn(userDetails));
            }
        }
    }, [passwordError, emailError, userNameError, isAuth])

    const list = (
        <Box
            sx={{ width: 400, textAlign: "center" }}
            role="presentation"
        >
            <Box>
                <Typography
                    sx={{
                        fontFamily: "Bungee,cursive",
                        fontSize: "2rem",
                        lineHeight: "2rem",
                        color: "#0980a1!important",
                        margin: "1rem",
                    }}
                    variant="h4"
                >
                    RPS.SH
                </Typography>
                <Divider />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100vmin",
                    width: "80%",
                    margin: "auto",
                    marginTop: "4rem"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography sx={{ fontWeight: "600" }} variant="h4" align="center">
                        Welcome!
                    </Typography>
                    <Typography
                        sx={{ lineHeight: "1rem", color: "#808080" }}
                        variant="caption"
                        align="center"
                        fontSize={".9rem"}
                    >
                        {drawerType === "signUp" ? "To Create Account" : "To Login Your Account"}
                    </Typography>
                    <Typography
                        sx={{ lineHeight: "1rem", color: "#808080" }}
                        variant="caption"
                        align="center"
                        fontSize={".9rem"}
                    >
                        Please enter your details to continue.
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "1rem",
                        gap: "1rem",
                        width: "300px",
                    }}
                >
                    {drawerType === "signUp" ? (<TextField
                        onChange={(e) => {
                            setUserDetails({ ...userDetails, name: e.target.value });
                        }}
                        label="User Name"
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={userNameError.errorType}
                        helperText={userNameError.message}
                    />) : <></>}

                    <TextField
                        onChange={(e) => {
                            setUserDetails({ ...userDetails, email: e.target.value });
                        }}
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={emailError.errorType}
                        helperText={emailError.message}
                    />
                    <TextField
                        onChange={(e) => {
                            setUserDetails({ ...userDetails, password: e.target.value });
                        }}
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        size="small"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={passwordError.errorType}
                        helperText={passwordError.message}
                    />

                    <Box sx={{ width: "100%", textAlign: "right" }}>
                        <Typography
                            sx={{
                                color: "#1d67fc",
                                fontSize: ".9rem",
                                cursor: "pointer",
                                fontWeight: "700",
                            }}
                            align="right"
                            variant="h6"
                            onClick={() => { drawerType === "signUp" ? dispatch(toggleDrawer(true, "signIn")) : dispatch(toggleDrawer(true, "signUp")) }}
                        >
                            {drawerType === "signUp" ? "Already have an account? Click here to SignIn" : "Don't have an account? Click here to Register"}
                        </Typography>
                    </Box>

                    <Button type="submit" fullWidth variant="contained" color='success' onClick={checkAndSend}>
                        {isLoading ? (<CircularProgress sx={{ color: "white", height: "24px !important", width: "24px !important", }} />) : (drawerType === "signUp" ? "Create Account" : "LogIn")}
                    </Button>
                </Box>
            </Box>
        </Box>
    );

    return (
        <div>
            <>
                <Drawer
                    anchor={'right'}
                    open={openDrawer}
                    onClose={handleDispatch}
                >
                    {drawerType === "urlList" ? <URLList /> : list}
                </Drawer>
            </>
        </div>
    );
}