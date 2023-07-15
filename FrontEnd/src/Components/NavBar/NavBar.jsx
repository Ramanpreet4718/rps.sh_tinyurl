import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import { toggleDrawer } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import BasicPopover from "../BasicPopover/BasicPopover";

export default function NavBar() {
    let dispatch = useDispatch();
    let isAuth = useSelector((store) => { return store.isAuth })

    return <>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
                sx={{
                    fontFamily: "Bungee,cursive",
                    fontSize: "2.25rem",
                    lineHeight: "2.5rem",
                    color: "white",
                    margin: "1rem",
                }}
                variant="h4"
            >
                RPS.SH
            </Typography>
            <Box sx={{ marginRight: "1rem" }}>
                <AppBar position="static" color="success" sx={{ maxHeight: "2.25rem", borderRadius: "4px" }}>
                    <Toolbar style={{ minHeight: "2.25rem" }}>

                        {isAuth ?
                            <>
                                <Typography
                                    sx={{
                                        fontFamily: "sans-serif",
                                        color: "white",
                                        mr: "1rem",
                                        cursor: "pointer"
                                    }}
                                    variant="subtitle"
                                    onClick={(e) => { dispatch(toggleDrawer(true, "urlList")) }}
                                >
                                    My URLs
                                </Typography>
                                <BasicPopover />
                            </> :
                            <>
                                <Typography
                                    sx={{
                                        fontFamily: "sans-serif",
                                        color: "white",
                                        mr: "1rem",
                                        cursor: "pointer"
                                    }}
                                    variant="subtitle"
                                    onClick={(e) => { dispatch(toggleDrawer(true, "signIn")) }}
                                >
                                    Sign In
                                </Typography>

                                <Typography
                                    sx={{
                                        fontFamily: "sans-serif",
                                        color: "white",
                                        mr: "1rem",
                                        cursor: "pointer"
                                    }}
                                    name="signUp"
                                    variant="subtitle"
                                    onClick={(e) => { dispatch(toggleDrawer(true, "signUp")) }}
                                >
                                    Sign up
                                </Typography>
                            </>
                        }

                        <Sidebar />
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    </>
}