
import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import UserAvatar from "./UserAvatar";
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      

      <div className="navbar-right">
        <div className="search-icon-div">
          {/* <MdOutlineSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="navbar-input" /> */}
        </div>
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;