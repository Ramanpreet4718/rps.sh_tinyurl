import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleURLGeneration } from "../../Redux/action";
import { isEmpty } from "../../utils/utils";

export default function RequestCard() {
  let [urlObj, setUrlObj] = useState({ tinyUrl: "", redirectUrl: "" });
  let [urlError, setUrlError] = useState({ errorType: false, message: "", });
  let dispatch = useDispatch();
  let isLoading = useSelector((state) => state.isLoading);
  let id = useSelector((state) => state.userId);

  const inputFunction = (e) => {
    setUrlObj({ ...urlObj, [e.target.name]: e.target.value });
  };

  const submitFunciont = () => {
    if (isEmpty(urlObj.redirectUrl)) {
      setUrlError({ ...urlError, errorType: true, message: "Please enter valid URL", })
      return
    }

    setUrlError({ ...urlError, errorType: false, message: "", })

    let response = dispatch(handleURLGeneration(urlObj));
  };

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
          name="redirectUrl"
          onChange={inputFunction}
          error={urlError.errorType}
          helperText={urlError.message}
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
          name="tinyUrl"
          onChange={inputFunction}
          inputProps={{ maxLength: 7 }}
          error={urlError.errorType}
        />
        <Button
          color="success"
          variant="contained"
          size="large"
          fullWidth
          onClick={submitFunciont}
          sx={{ margin: "1rem 0", textTransform: "none" }}
        >
          {isLoading ? (<CircularProgress sx={{ color: "white", height: "24px !important", width: "24px !important", }} />) : "Make tinyURL!"}
        </Button>
      </CardContent>
    </Card>
  );
}
