import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import React from "react";
import RequestCard from "./RequestCard";
import DisplayCard from "./DisplayCard";
import { useSelector } from "react-redux";
export default function Homepage() {
  let isSuccess = useSelector((state) => state.isSuccess);

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
        {isSuccess ? <DisplayCard /> : <RequestCard />}
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
