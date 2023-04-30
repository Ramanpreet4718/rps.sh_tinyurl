import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";
export default function Homepage() {
  return (
    <Container maxWidth="xl" disableGutters={true}>
      <Box>
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
      </Box>
      <Box sx={{ display: "flex", gap: "3rem" }}>
        <Card sx={{ marginLeft: "1.25rem", width: "400px" }}>
          <CardContent>
            <Typography
              sx={{
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: ".25rem",
              }}
            >
              {
                <LinkIcon
                  sx={{ fontSize: "1.5rem", transform: "rotate(135deg)" }}
                />
              }{" "}
              Enter a long URL to make a TinyURL
            </Typography>
            <TextField
              sx={{ marginTop: "1rem" }}
              variant="outlined"
              size="small"
              fullWidth
              name="redirect_url"
            />
            <Typography
              sx={{
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: ".25rem",
                marginTop: "1rem",
              }}
            >
              {
                <AutoFixHighIcon
                  sx={{ fontSize: "1.5rem", transform: "rotate(353deg)" }}
                />
              }
              Customize your link
            </Typography>
            <TextField
              sx={{ marginTop: "1rem" }}
              variant="outlined"
              size="small"
              fullWidth
              name="curtom_url"
            />
            <Button
              color="success"
              variant="contained"
              size="large"
              fullWidth
              sx={{ margin: "1rem 0", textTransform: "none" }}
            >
              Make tinyURL!
            </Button>
          </CardContent>
        </Card>
        <Box sx={{ color: "white" }}>
          <Typography variant="h6">Welcome to</Typography>
          <Typography sx={{ fontFamily: "Bungee,cursive" }} variant="h3">
            RPS.SH
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".25rem",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            {<CheckIcon fontSize="large" />}
            Easy to Link Shortening
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".25rem",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            {<CheckIcon fontSize="large" />}
            Customized TinyURLs
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".25rem",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            {<CheckIcon fontSize="large" />}
            100% Free of Cost
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
