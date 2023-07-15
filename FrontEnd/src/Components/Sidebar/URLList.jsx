import { useSelector } from "react-redux"
import { dateFormatter } from "../../utils/utils";
import { Avatar, Box, Divider, Link, Typography } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import { green } from "@mui/material/colors";

export default function URLList() {
    const list = useSelector((store) => { return store.userURLList });

    return (<Box
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
                height: "100vmin",
                marginTop: "2rem",
                marginLeft: "1rem",

            }}
        >
            {list.map((element) => {
                const date = dateFormatter(element.createdAt)
                return <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row", gap: ".5rem",
                        justifyContent: "flex-start",
                        marginTop: "1rem",
                        border: "1px solid #dee2e6",
                        padding: "1rem",
                        textAlign: "left"
                    }}
                >

                    <Avatar variant="rounded" sx={{ bgcolor: green[500] }}><LinkIcon /></Avatar>
                    <Box>
                        <Link href={element.redirectUrl} target="_blank" underline='none' variant="body1" sx={{ fontWeight: "bold", color: "#212529" }}>{`https://rps-sh.vercel.app/${element.tinyUrl}`}</Link>
                        <Typography variant='body2' align='left' sx={{ color: '#809a32' }}>{element.redirectUrl}</Typography>
                        <Typography variant='caption' sx={{ color: '#6c757d' }}>{date}</Typography>
                    </Box>
                </Box>
            })}
        </Box>
    </Box>)
}