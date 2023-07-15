import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import { signout_success } from "../../Redux/action";
import { store } from "../../Redux/store"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function BasicPopover() {
    let [ancherPop, setAncherPop] = useState(null);
    let username = useSelector((store) => { return store.username })

    const handleClick = (event) => {
        setAncherPop(event.currentTarget)
    }

    const handleClose = () => {
        setAncherPop(null);
    }

    const handleSignout = () => {
        console.log("hello");
        store.dispatch(signout_success())
        toast.success("Successfully Signout");
    }

    let open = Boolean(ancherPop);
    let id = open ? "simple-popover" : undefined;

    return (
        <div>
            <Typography
                sx={{
                    fontFamily: "sans-serif",
                    color: "white",
                    mr: "1rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center"
                }}
                variant="subtitle"
                aria-describedby={id}
                onClick={handleClick}
            >
                {username} < ArrowDropDownIcon />
            </Typography>
            <Popover
                id={id}
                open={open}
                anchorEl={ancherPop}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "sans-serif",
                        padding: "10px 16px",
                        cursor: "pointer"
                    }}
                    onClick={handleSignout}
                >
                    Sign out
                </Typography>
            </Popover>
        </div>
    )

}