import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Contact.css";

const Contact = () => {
  
  return (
      <form className="formContainer">

        <input type="email" placeholder="Email" className="inputs"></input>
        <input type="text" placeholder="Subject" className="inputs"></input>
        <textarea placeholder="Message" className="inputs"></textarea>
        <input type="submit" className="inputs"></input>

      </form>
  )
}

export default Contact;