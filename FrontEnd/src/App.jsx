import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Redirect from "./Components/Redirect/Redirect";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:shortUrl" element={<Redirect />} />
      </Routes>
      <ToastContainer theme="colored" position="top-center" />
    </>
  );
}

export default App;
