import React, { useState , useEffect } from "react";
import ModalWrapper from "./ModelWrapper";
import Textbox from "./Textbox";
import SelectList from "./SelectList";
import Button from "./Button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import "../styles/UserProfile.css";

const ROLES = ["Analyst", "Tester", "Backend Developer", "Frontend Developer"];

const UserProfile = ({ open, setOpen }) => {
  const profile = "";
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(profile?.role?.toUpperCase() || ROLES[0]);

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (username === ""  || email === "") {
      alert("All fields are required");
      return;
    }
  
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.put(
        `http://10.66.67.132:8000/api/users/${JSON.parse(user)._id}`, 
        { 
          name: username, 
          email, 
          role }, 
        {
          headers: { "Authorization": `Bearer ${token}` } 
        }
      );
  
      if(response.data.success){
        alert(response.data.message);
        setUsername("");
        setEmail("");
        setRole(ROLES[0])
      } else {
        toast.success(response.data.message);
      }
  
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  
    setOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
      
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;
        
        const response = await axios.get("http://10.66.67.132:8000/api/profile", {
          params: {
            email: userEmail,
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = JSON.parse(response.data);
        setUser(response.data);
        setUsername(data.name);
        setEmail(data.email);
        setRole(data.role);
  
        console.log('received user data:', response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUserData();
  }, []);

  // render JSX
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form className="UserProfileModel" onSubmit={(e) => submitHandler(e)}>
          <div className="edit_profile_div">
            <h2>EDIT PROFILE</h2>
            <Textbox
              placeholder='Username'
              type='text'
              onChange={(e) => setUsername(e.target.value)}
              name='username'
              value={username}
              label='Username'
              className='editProfile_username'
            />
      
            <Textbox
              placeholder='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              label='Email'
            />
            <SelectList
              label='Role'
              lists={ROLES}
              selected={role}
              setSelected={setRole}
            />
            
            <Button
              label='Update'
              type='submit'
              className="update-submit"
            />
            <Button
              type='button'
              onClick={() => setOpen(false)}
              label='Cancel'
              className="update-cancel"
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default UserProfile;











