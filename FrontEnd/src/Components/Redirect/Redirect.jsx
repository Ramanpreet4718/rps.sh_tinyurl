import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleTinyURLRedirect } from "../../Redux/action";

export default function Redirect() {
  let { shortUrl } = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleTinyURLRedirect(shortUrl));
  }, []);

  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}></div>
  );
}
