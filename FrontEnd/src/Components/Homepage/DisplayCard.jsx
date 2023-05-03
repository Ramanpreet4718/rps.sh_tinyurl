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
import { useSelector, useDispatch } from "react-redux";
import { new_request } from "../../Redux/action";

export default function DisplayCard() {
  let tinyURL = useSelector((state) => state.tinyUrl);
  let redirectUrl = useSelector((state) => state.redirectUrl);
  let dispatch = useDispatch();

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
          URL
        </Typography>
        <TextField
          sx={{ marginTop: "1rem" }}
          variant="outlined"
          size="small"
          fullWidth
          defaultValue={redirectUrl}
          name="redirect_url"
          InputProps={{
            readOnly: true,
          }}
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
          Tiny URL
        </Typography>
        <TextField
          sx={{ marginTop: "1rem" }}
          variant="outlined"
          size="small"
          fullWidth
          name="tiny_url"
          defaultValue={tinyURL}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          color="success"
          variant="contained"
          size="large"
          fullWidth
          sx={{ margin: "1rem 0", textTransform: "none" }}
          onClick={() => {
            dispatch(new_request());
          }}
        >
          Make New tinyURL!
        </Button>
      </CardContent>
    </Card>
  );
}
