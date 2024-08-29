// Import react 
import React from 'react';
// Import the Routes and Route components from react-router 
import { Routes } from "react-router";
// Import the page components 
// import Home from "./markup/pages/Home";
// import Login from "./markup/pages/Login";
// import AddEmployee from './markup/pages/admin/AddEmployee';

// Import the css files 
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// Import the custom css file 
import "./assets/styles/custom.css";

// Import the Header component 
import Header from './markup/components/Header/Header';
// Import the Footer component
import Footer from './markup/components/Footer/Footer';

function App() {
  return (
    <>

      <Header />
      <Routes>
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
