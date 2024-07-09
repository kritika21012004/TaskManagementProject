import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AuthContext } from "../AuthContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const {user,setUser}=useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    tasks: [],
    isActive: true,
    created_at: new Date()
  });

  const validatePassword = (password) => {
    // Require at least one digit, one lower case, one upper case
    // and one special character
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}/;
    return re.test(password);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'role') {
      setIsAdmin(value === 'Admin' ? true : false);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const signUp = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      toast.error('Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters');
      return;
    }

    try {
      const result = await axios.post('http://localhost:8000/api/register', { ...formData });
      if (result.data.success) {
        setUser(result.data.user);
        localStorage.setItem('jwtToken', result.data.token);
        localStorage.setItem('name',result.data.name);
        toast.success('Registered successfully. Please Login');
        setFormData({
          username: '',
          email: '',
          password: '',
          role: '',
          tasks: [],
          isActive: true,
          created_at: new Date()
        });
        navigate('/');
        document.querySelector(".label-login").dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
      else{
        toast.error("Something went wrong");
      }
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:8000/api/login', formData);
      if (result.data) {
        setUser(result.data.user);
        localStorage.setItem('jwtToken', result.data.token);
        localStorage.setItem('name',result.data.name);
        toast.success('Login successfully');
        navigate('/dashboard');
        
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
      else{
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="body">
        <div className="main">
          <input type="checkbox" id="chk" className="hidden" aria-hidden="true" />
          <div className="signup">
            <form onSubmit={signUp}>
              <label htmlFor="chk" aria-hidden="true" className="label-signup">Sign up</label>
              <input type="text" name="username" 
                placeholder="User name" value={formData.username}
                className="inputform" required onChange={handleChange} />
              <input type="email" name="email" 
                placeholder="Email" value={formData.email}
                className="inputform" required onChange={handleChange} />
              <select name="role" required className="selectform" onChange={handleChange} value={formData.role}>
                <option value="">Select Role</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Analyst">Analayst</option>
                <option value="Tester">Tester</option>
                <option value="BackendDeveloper">Backend Developer</option>
              </select>
              <input type="password" name="password" 
                placeholder="Password" value={formData.password}
                className="inputform" required onChange={handleChange} />
              <button className="sub-button">Sign up</button>
            </form>
          </div>
          <div className="login">
            <form onSubmit={signIn}>
              <label htmlFor="chk" aria-hidden="true" className="label-login">Login</label>
              <input type="email" name="email" placeholder="Email" className="inputform" required onChange={handleChange} />
              <input type="password" name="password" placeholder="Password" className="inputform" required onChange={handleChange} />
              <button className="sub-button" >Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;