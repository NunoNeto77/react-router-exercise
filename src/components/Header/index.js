import React from "react";
import "./Header.css"
import { Link } from "react-router-dom";

function Header () {

    return (
      <div className="container">
        <div className="navsContainer">
          <nav>
            <ul className="list">
              <li>
                <Link to="/" className="links">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="links">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="links">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="links">
                  Gallery
                </Link>
              </li>
            </ul>

            <ul className="list">
              <li>
                <Link to="/register" className="links" id="register">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="links" id="login">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
}


export default Header;