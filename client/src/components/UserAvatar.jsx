import React from 'react';
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getInitials } from "../utils";
import "../styles/UserAvatar.css"
import axios from 'axios';
import ChangePassword from "./ChangePassword.jsx";
import { toast } from 'react-toastify';
import UserProfile from "./UserProfile.jsx";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    const logOut = async () => {
      try {
        await axios.get('http://10.66.67.132:8000/api/logout');
        localStorage.removeItem('jwtToken');
        toast.success('Logout successfully');
        navigate('/');

      } catch (err) {
        toast.error(err.message);
        console.error(err.message)
      }
    }
    logOut();
  };

  const userName = localStorage.getItem("name") || "No User";

  return (
    <>
      <div>
        <Menu as="div" className="useravatar-div">
          <div>
            <Menu.Button className="useravatar-button">
              <span className="profile">
                {getInitials(userName)}
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="enter"
            enterFrom="enterfrom"
            enterTo="enterto"
            leave="leave"
            leaveFrom="leavefrom"
            leaveTo="leaveto"
          >
            <Menu.Items className="useravatar-menu">
              <div className="p-4">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)}
                      className="profile"
                    >
                      <FaUser className="mr-2" aria-hidden="true" />
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenChangePassword(true)}
                      className="profile"
                    >
                      <FaUserLock className="mr-2" aria-hidden="true" />  {/* Here is the icon */}
                      ChangePassword
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}

                      className="profile"
                    >
                      <IoLogOutOutline className="mr-2" aria-hidden="true" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {open && <UserProfile open={open} setOpen={setOpen} />}
      {openChangePassword && <ChangePassword open={openChangePassword} setOpen={setOpenChangePassword} />}

    </>
  );
};

export default UserAvatar;