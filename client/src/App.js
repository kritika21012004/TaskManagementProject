// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
// import Tasks from"./pages/Tasks";

// function App() {
//   return (
//     <Router>
//        <ToastContainer />
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/dashboard/tasks" element={<Tasks />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
// import Tasks from"./pages/Tasks";
// import { AuthContext } from "./AuthContext";

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <Router>
//     <AuthContext.Provider value={{ user, setUser }}>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/dashboard/tasks" element={<Tasks />} />
//       </Routes>
//       </AuthContext.Provider>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Tasks from "./pages/Tasks";
import { AuthContext } from "./AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        {/* <div className="navbar">
          <Navbar />
        </div> */}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/users" element={<Users/>} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;