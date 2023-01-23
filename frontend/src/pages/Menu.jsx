import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <header>
      <div>
        <Link to="/userLogin">LOGIN</Link>
      </div>
      <div>
        <Link to="/registerUser">SIGNUP</Link>
      </div>
      </header>
      <div><h1>WELCOME TO HOME PAGE</h1></div>

    </>
  );
};

export default Menu;
