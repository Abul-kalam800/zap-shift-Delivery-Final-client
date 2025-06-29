import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../componets/Logo";
import useAuth from "../../hook/useAuth";

const Navbar = () => {
  const {user,logOut} =useAuth()
  const navlinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/">Service</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverages</NavLink>
      </li>
      <li>
        <NavLink to="/">About us</NavLink>
      </li>
      <li>
        <NavLink to="/">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/sendpercel">Send percel</NavLink>
      </li>
      <li>
        <NavLink to="/">Be a rider</NavLink>
      </li>
    </>
  );
  const handleLogout =()=>{

    logOut()
    .then(()=>{
      console.log("signOut successfully")
    })
    .catch(error=>{
      console.log(error)
    })
  }
  return (
    <div className="navbar shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navlinks}
          </ul>
        </div>
      
            <Logo></Logo>
       
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        {
          user? <button onClick={handleLogout}>Log Out</button>:<> <Link to='/login' className="btn bg-green-500">Sign up</Link>
        <Link to='' className="btn border-2">Be a Rider</Link></>
        }
       
      </div>
    </div>
  );
};

export default Navbar;
