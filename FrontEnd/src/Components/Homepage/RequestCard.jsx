import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import React from "react";

export default function RequestCard() {
  return (
    <Card sx={{ marginLeft: "1.25rem", width: "400px", borderRadius: "10px" }}>
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
  );
}
