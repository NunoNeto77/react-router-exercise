import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");


  let raw = JSON.stringify({
    email: email,
    username: username,
    password: password,
  });

  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic b2xhOmMwYzFiNmY2MGU0N2MxNzRkOWE3MWIzMzg2NzAyMTkzLXVzMTQ="
  );
  myHeaders.append("Content-Type", "application/json");

  const request: RequestInit = {
    method: "POST",
    mode: "cors",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const register = () => {
    console.log(raw);

    fetch("http://localhost:3001/register", request)
      .then((response) => response.json())
      .then((data) => {
        if (data === "Internal server error") {
          setSucessMessage("Invalid try");
          return;
        }
        setSucessMessage(data.message);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container">
      <h1 className="title">CREATE YOUR ACCOUNT</h1>

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
          type="text"
          className="inputs"
          placeholder="Name"
          onChange={(e) => {
            setUsername(e.target.value);
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
        <button className="submitButton" onClick={register}>
          Create
        </button>
      </div>

      <p>{sucessMessage}</p>
    </div>
  );
};

export default Register;
