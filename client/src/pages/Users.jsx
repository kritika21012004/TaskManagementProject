// import React, { useState ,useEffect} from "react";
// import Title from "../components/Title";
// import { summary } from "../assets/data";
// import { getInitials } from "../utils";
// import axios from "axios"
// import clsx from "clsx";
// import Sidebar from "../components/Sidebar"
// import Navbar from "../components/Navbar";
// import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
// import "../styles/Users.css"

// const Users = () => {
//   // const [openDialog, setOpenDialog] = useState(false);
//   // const [open, setOpen] = useState(false);
//   // const [openAction, setOpenAction] = useState(false);
//   // const [selected, setSelected] = useState(null);

//   // const userActionHandler = () => {};
//   // const deleteHandler = () => {};
//   const [users,setUsers]=useState([]);
//   useEffect(() => {
//     axios.get('/api/users')
//     .then((response) => {
//         setUsers(response.data);
//     })
//     .catch((error) => {
//         console.error(`Error fetching data: ${error}`);
//     });
// }, []);


//   const TableHeader = () => (
//     <thead className='table-heading'>
//       <tr className='table-row-heading'>
//         <th className='py-2-username'>Username</th>
//         <th className='py-2-email'>Email</th>
//         <th className='py-2-role'>Role</th>
//         <th className="py-2-tasks">Tasks</th>
//       </tr>
//     </thead>
//   );
//   const TableRow = ({ user }) => (
//     <tr className='table-first-row'>
//       <td className='p-2'>
//         <div className='table-outer-div'>
//           <div className='table-inner-div'>
//             <span className='table-row-span'>
//               {getInitials(user.name)}
//             </span>
//           </div>
//           {user.name}
//         </div>
//       </td>

//       <td className='p-2-email'>{user.email || "user.emal.com"}</td>
//       <td className='p-2-role'>{user.role}</td>
//       <td className='p-2-tasks'>{user.tasks}</td>
//     </tr>
//   );
//   return (
//     <>

// <div className="main-content">

// <div className="sidebar">
//   <Sidebar />
// </div>
// <div className='task-main-div'>
// <Navbar/>

//       <div className='table-teammember-div'>
//         <div className='table-teammember-inner-div'>
//           <Title title='Users'/>
//         </div>

//         <div className='return-table-div'>
//           <div className='overflow-x-auto'>
//             <table className='w-full-mb-5'>
//               <TableHeader />
//               <tbody>
//                 {summary.users?.map((user, index) => (
//                   <TableRow key={index} user={user} />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//         </div>
//         </div>
//       </>
//     );
//   };
  
//   export default Users;




import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import axios from 'axios';
import { getInitials } from "../utils";
import clsx from "clsx";
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import "../styles/Users.css"

const Users = () => {
  const [users, setUsers] = useState([]);
  const [usersTasks, setUsersTasks] = useState({});

  const fetchUserTasks = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${userId}/tasks`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tasks: ${error}`);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
    .then((response) => {
      setUsers(response.data);
      response.data.forEach(async (user) => {
        const userTasks = await fetchUserTasks(user._id);
        setUsersTasks(prevState => {
          return { ...prevState, [user._id]: userTasks };
        });
      });
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    });
  }, []);

  const TableHeader = () => (
    <thead className='table-heading'>
      <tr className='table-row-heading'>
        <th className='py-2-username'>Username</th>
        <th className='py-2-email'>Email</th>
        <th className='py-2-role'>Role</th>
        <th className="py-2-tasks">Tasks</th>
      </tr>
    </thead>
  );
  
  const TableRow = ({ user }) => {
    // Get the tasks for the specific user
    const tasksForUser = usersTasks[user._id];
  
    return (
      <tr className='table-first-row'>
        <td className='p-2'>
          <div className='table-outer-div'>
            <div className='table-inner-div'>
              <span className='table-row-span'>
                {getInitials(user.name)}
              </span>
            </div>
            {user.name}
          </div>
        </td>
        
        <td className='p-2-email'>{user.email || "user.email.com"}</td>
        <td className='p-2-role'>{user.role}</td>
        <td className='p-2-tasks'>
        {tasksForUser ? tasksForUser.map(task => (
          // Assuming each task object has a 'name' property
          <div key={task._id}>{task.name}</div>
        )) : 'No tasks'}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className='task-main-div'>
          <Navbar/>
          <div className='table-teammember-div'>
            <div className='table-teammember-inner-div'>
              <Title title='Users'/>
            </div>
            <div className='return-table-div'>
              <div className='overflow-x-auto'>
                <table className='w-full-mb-5'>
                  <TableHeader />
                  <tbody>
                    {users.map((user, index) => (
                      <TableRow key={index} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;