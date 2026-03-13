import React from "react";
import "./Home.css";
import { Container, Button, Navbar } from "react-bootstrap";
 // ✅ Ensure this file exists
import About from "./About";     // ✅ Ensure this file exists
import Services from "./Services";
import Team from "./Team";
import Contact from "./Contact";
import Banner from "./Banner";
import ServicesByCategory from "./ServicesByCategory";
import Category from "./Category";



const Home = () => {
  return (
    <div>
    
      <Banner/>
      <About />
      <Category/>
      <Team />
      <Contact />
                  
   
    </div>
  );
};

export default Home;
