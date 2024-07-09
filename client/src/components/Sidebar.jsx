import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import "../styles/Sidebar.css"

const linkData = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "/tasks",
    icon: <FaTasks />,
  },
  {
    label: "Users",
    link: "/users",
    icon: <FaUsers />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = linkData.slice(0, 5);
  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        className={clsx(
          "nav-link",
          path === el.link.split("/")[1] && "sidebar-path" 
        )}
      >
        {el.icon}
        <span className='nav-icon'>{el.label}</span>
      </Link>
    );
  };
  
  return (
    <div className='sidebar-div1'>
      <h1 className='sidebar-heading'>
        <p className='sidebar-p'>
          <MdOutlineAddTask className='sidebar-addtask' />
        </p>
        <span className='sidebar-span'>TaskMe</span>
      </h1>

      <div className='sidebar-maplink'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      
    </div>
  );
};

export default Sidebar;