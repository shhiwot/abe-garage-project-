import React from "react";
import { Routes, Route } from "react-router";
import Home from "./markup/pages/Home";

// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// // Import the custom css file
import "./assets/styles/custom.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
