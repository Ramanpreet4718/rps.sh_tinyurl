import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleTinyURLRedirect } from "../../Redux/action";
import { Box, CircularProgress } from "@mui/material";

export default function Redirect() {
  let { shortUrl } = useParams();
  let dispatch = useDispatch();
  let isLoading = useSelector((state) => {
    return state.isLoading;
  });

  useEffect(() => {
    dispatch(handleTinyURLRedirect(shortUrl));
  }, []);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {isLoading ? (
        <CircularProgress size={500} sx={{ color: "white" }} />
      ) : (
        <div></div>
      )}
    </Box>
  );
}
