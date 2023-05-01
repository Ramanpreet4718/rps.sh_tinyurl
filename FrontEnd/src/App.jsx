import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Redirect from "./Components/Redirect/Redirect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/:shortUrl" element={<Redirect />} />
    </Routes>
  );
}

export default App;
