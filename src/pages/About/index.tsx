import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css"
const About = () => {

  const navigate = useNavigate();
  
  useEffect(() => {

    fetch("http://localhost:3001/checkToken")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) navigate("/login");
      }); 
    }
  )
  

  return (
    <div className="aboutContainer">
      This is a page that talks about Kimetsu No Yaiba
    </div>
  )
}

export default About;