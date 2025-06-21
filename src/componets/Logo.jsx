import React from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router";
const Logo = () => {
  return (
    <div className="">
      <NavLink to="/" className="flex items-center">
        <img className="mb-4" src={logo} alt="" />
        <h2 className="font-bold text-2xl -ml-4 font-family">Profast</h2>
      </NavLink>
    </div>
  );
};

export default Logo;
