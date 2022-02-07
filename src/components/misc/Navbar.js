import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Snippet manager</h1>
      </Link>
      <div>
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Navbar;
