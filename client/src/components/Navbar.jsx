
import React from "react";
import UserAvatar from "./UserAvatar";
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      

      <div className="navbar-right">
        <div className="search-icon-div">
        </div>
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;