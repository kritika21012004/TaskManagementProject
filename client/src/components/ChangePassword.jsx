import React, { useState } from "react";
import ModalWrapper from "./ModelWrapper";
import Textbox from "./Textbox";
import Button from "./Button";
import axios from "axios";
import {jwtDecode }from "jwt-decode";
import "../styles/ChangePassword.css"

const ChangePassword = ({ open, setOpen }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateUserPassword = async () => {
    if (oldPassword === "" || newPassword === "") {
      alert("All fields are required"); 
      return;
    }

    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {
      const response = await axios.put(
        `http://10.66.65.17:8000/api/password_change/${userId}`,
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert(response.data.message);
        setOldPassword("");
        setNewPassword("");
      } else {
        alert(response.data.message);
      }

    } catch (err) {
      console.error(err.message);
      alert("An error occurred while changing password.");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form  className='changepasswordmodel' onSubmit={(e) => {
        e.preventDefault();
        updateUserPassword();
      }}>
        <div className="edit_profile_div">
          <h2>CHANGE PASSWORD</h2>
          <Textbox
            placeholder='Old password'
            type='password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            label="Old password"
          />
          <Textbox
            placeholder='New password'
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label="New password"
          />
          <Button
            label='Change'
            type='submit'
            className="change-password-submit"
          />
          <Button
            type='button'
            onClick={() => setOpen(false)}
            label='Cancel'
            className="change-password-cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ChangePassword;