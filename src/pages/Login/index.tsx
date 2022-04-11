import React, { useState } from 'react'
import "./Login.css"
import Axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");


  let raw = {
    email: email,
    password: password
  };




  const login = () => {
    console.log(raw)
    Axios.post("http://localhost:3001/login", raw, {
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      if (res.data.message === "Internal server error") {
        setSucessMessage("Invalid try");
        return;
      }
      setSucessMessage(res.data.message);
    });

    
  };

  
    return (
      <div className="container">
        <h1 className="title">Login</h1>

        <div className="formContainer">
          <input
            type="email"
            className="inputs"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            type="password"
            className="inputs"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button className="submitButton" onClick={login}>
            Login
          </button>
        </div>

        <p>{sucessMessage}</p>
      </div>
    );
};


export default Login;