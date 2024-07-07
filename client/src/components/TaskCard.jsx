// import clsx from "clsx";
// import React, { useState ,useContext ,Fragment} from "react";
// import {
//   MdAttachFile,
//   MdKeyboardArrowDown,
//   MdKeyboardArrowUp,
//   MdKeyboardDoubleArrowUp,
// } from "react-icons/md";
// import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
// import TaskDialog from "./TaskDialog";
// import { BiMessageAltDetail } from "react-icons/bi";
// import { FaList,FaEdit,FaTrashAlt } from "react-icons/fa";
// import UserInfo from "./UserInfo";
//  import { Menu, Transition } from "@headlessui/react";
// import { IoMdAdd } from "react-icons/io";
// import { AuthContext } from '../AuthContext.js';
// import "../styles/TaskCard.css"

// const ICONS = {
//   high: <MdKeyboardDoubleArrowUp />,
//   medium: <MdKeyboardArrowUp />,
//   low: <MdKeyboardArrowDown />,
// };

// const TaskCard = ({ task }) => {
//     const { user } = useContext(AuthContext);
//   const [open, setOpen] = useState(false);


//   const [openDialog, setOpenDialog] = useState(false);
//   const [selected, setSelected] = useState(null);

  
//   const handleEdit = () => {
//         console.log(`Editing`);
//       };
    
//       const deleteButtonClick = () => {
//         setOpenDialog(true);
//       };
    
//       const handleDialogClose = () => {
//         setOpenDialog(false);
//       };

//   return (
//     <>
//       <div className='taskcard-outer-div'>
//         <div className='taskcard-outer-div-1'>
//           <div
//             className={clsx(
//               "taskcard-inner-div",
//               PRIOTITYSTYELS[task?.priority]
//             )}
//           >
//             <span className='text-lg'>{ICONS[task?.priority]}</span>
//             <span className='uppercase'>{task?.priority} Priority</span>
//             <div className="moreoptions">
          
//               <Menu as="div" className="moreoption-div">
//               <div>
//                <Menu.Button className="moreoption-button">...</Menu.Button>
//              </div>
             



// <Transition
//             as={Fragment}
//             enter="enter"
//             enterFrom="enterfrom"
//             enterTo="enterto"
//             leave="leave"
//             leaveFrom="leavefrom"
//             leaveTo="leaveto"
//           >
//             <Menu.Items className="moreoption-menu">
//               <div className="px-1-py-1">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       onClick={handleEdit}
//                       className="inner-option"
//                     >
//                       <FaEdit className="mr-2" aria-hidden="true" />
//                       Edit
//                     </button>
//                   )}
//                 </Menu.Item>
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       // onClick={handleDelete}
//                       onClick={deleteButtonClick} 
//                       className="inner-option"
//                     >
//                       <FaTrashAlt className="mr-2" aria-hidden="true" />
//                       Delete
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//             </Menu>
              
              
              
//               </div>
//           </div>

//           {user?.isAdmin && <TaskDialog task={task} />}
//         </div>

//         <>
//       <div className='taskcard-formatdate-div'>
//             <div
//               className={clsx("taskcard-taskstage", TASK_TYPE[task.stage])}
//             />
//             <h4 className='taskcard-format-div-h4'>{task?.title}</h4>
//           </div>
//           <span className='taskcard-formatdate-span'>
//             {formatDate(new Date(task?.date))}
//           </span>
//         </>
//         <div className='taskcard-bimsgdetail' />
//         <div className='taskcard-bimsgdetail-outer-1'>
//           <div className='taskcard-bimsgdetail-outer-2'>
//             <div className='taskcard-bimsgdetail-inner'>
//               <BiMessageAltDetail />
//               <span>{task?.activities?.length}</span>
//             </div>
//             <div className='mdattachfile'>
//               <MdAttachFile />
//               <span>{task?.assets?.length}</span>
//             </div>
//             <div className='mdattachfile'>
//               <FaList />
//               <span>0/{task?.subTasks?.length}</span>
//             </div>
//           </div>

//           <div className='taskcard-userinfo'>
//             {task?.team?.map((m, index) => (
//               <div
//                 key={index}
//                 className={clsx(
//                   "taskcard-userinfo-inner",
//                   BGS[index % BGS?.length]
//                 )}
//               >
//                 <UserInfo user={m} />
//               </div>
//             ))}
//           </div>
//           </div>


//   </div>  
//     </>
//   );
// };

// export default TaskCard;




// import clsx from "clsx";
// import React, { useState ,useContext ,Fragment} from "react";
// import {
//   MdAttachFile,
//   MdKeyboardArrowDown,
//   MdKeyboardArrowUp,
//   MdKeyboardDoubleArrowUp,
// } from "react-icons/md";
// import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
// import TaskDialog from "./TaskDialog";
// import { BiMessageAltDetail } from "react-icons/bi";
// import { FaList,FaEdit,FaTrashAlt } from "react-icons/fa";
// import UserInfo from "./UserInfo";
//  import { Menu, Transition } from "@headlessui/react";
// import { IoMdAdd } from "react-icons/io";
// import { AuthContext } from '../AuthContext.js';
// import "../styles/TaskCard.css"
// import ConfirmatioDialog from "./Dialogs"; // Import ConfirmationDialog here

// const ICONS = {
//   high: <MdKeyboardDoubleArrowUp />,
//   medium: <MdKeyboardArrowUp />,
//   low: <MdKeyboardArrowDown />,
// };

// const TaskCard = ({ task }) => {
//   const { user } = useContext(AuthContext);
// const [open, setOpen] = useState(false);


// const [openDialog, setOpenDialog] = useState(false);
// const [selected, setSelected] = useState(null);


// const handleEdit = () => {
//   console.log(`Editing`);
// };

// const deleteButtonClick = () => {
//   setSelected(task._id);
//   setOpenDialog(true);
// };


// const deleteHandler = () => {
//   console.log("Delete action here."); // TODO: Add Delete function here
// };


//   return (
//     <>
//       <div className='taskcard-outer-div'>
//         <div className='taskcard-outer-div-1'>
//           <div
//             className={clsx(
//               "taskcard-inner-div",
//               PRIOTITYSTYELS[task?.priority]
//             )}
//           >
//             <span className='text-lg'>{ICONS[task?.priority]}</span>
//             <span className='uppercase'>{task?.priority} Priority</span>
//             <div className="moreoptions">
          
//               <Menu as="div" className="moreoption-div">
//               <div>
//                <Menu.Button className="moreoption-button">...</Menu.Button>
//              </div>
             



// <Transition
//             as={Fragment}
//             enter="enter"
//             enterFrom="enterfrom"
//             enterTo="enterto"
//             leave="leave"
//             leaveFrom="leavefrom"
//             leaveTo="leaveto"
//           >
//             <Menu.Items className="moreoption-menu">
//               <div className="px-1-py-1">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       onClick={handleEdit}
//                       className="inner-option"
//                     >
//                       <FaEdit className="mr-2" aria-hidden="true" />
//                       Edit
//                     </button>
//                   )}
//                 </Menu.Item>
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       // onClick={handleDelete}
//                       onClick={deleteButtonClick} 
//                       className="inner-option"
//                     >
//                       <FaTrashAlt className="mr-2" aria-hidden="true" />
//                       Delete
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//             </Menu>
              
              
              
//               </div>
//           </div>

//           {user?.isAdmin && <TaskDialog task={task} />}
//         </div>

//         <>
//       <div className='taskcard-formatdate-div'>
//             <div
//               className={clsx("taskcard-taskstage", TASK_TYPE[task.stage])}
//             />
//             <h4 className='taskcard-format-div-h4'>{task?.title}</h4>
//           </div>
//           <span className='taskcard-formatdate-span'>
//             {formatDate(new Date(task?.date))}
//           </span>
//         </>
//         <div className='taskcard-bimsgdetail' />
//         <div className='taskcard-bimsgdetail-outer-1'>
//           <div className='taskcard-bimsgdetail-outer-2'>
//             <div className='taskcard-bimsgdetail-inner'>
//               <BiMessageAltDetail />
//               <span>{task?.activities?.length}</span>
//             </div>
//             <div className='mdattachfile'>
//               <MdAttachFile />
//               <span>{task?.assets?.length}</span>
//             </div>
//             <div className='mdattachfile'>
//               <FaList />
//               <span>0/{task?.subTasks?.length}</span>
//             </div>
//           </div>

//           <div className='taskcard-userinfo'>
//             {task?.team?.map((m, index) => (
//               <div
//                 key={index}
//                 className={clsx(
//                   "taskcard-userinfo-inner",
//                   BGS[index % BGS?.length]
//                 )}
//               >
//                 <UserInfo user={m} />
//               </div>
//             ))}
//           </div>
//           </div>


//   </div>  
//     </>
//   );
// };

// export default TaskCard;




import clsx from "clsx";
import React, { useState ,useContext ,Fragment} from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./TaskDialog";
import { getInitials } from "../utils";
import axios from "axios";

import { BiMessageAltDetail } from "react-icons/bi";
import { FaList,FaEdit,FaTrashAlt } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { Menu, Transition } from "@headlessui/react";
import ConfirmatioDialog from "./Dialogs"; // Import ConfirmationDialog here
import { AuthContext } from '../AuthContext.js';
import "../styles/TaskCard.css"
import EditTask from "./EditTask.jsx";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task, getUserById ,setTasks}) => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editTask, setEditTask] = useState(null)


  const deleteButtonClick = () => {
    setSelected(task._id);
    setOpenDialog(true);
  };

  const handleEdit = () => {
    setEditTask(task);
    setOpen(true);
  };
  const assetget=async()=>{
    // onClick={() => task?.assets && window.open(`http://localhost:8000/api/tasks/${task._id}/${task?.assets[0]}`)}
    // window.open(`http://localhost:8000/api/tasks/${task._id}`)} 
    // console.log(task)
  //  const response = await axios.get(`http://localhost:8000/api/tasks/assets/${task._id}`)
  //  console.log(response)
    console.log("file2")

  }

  const deleteHandler = async(id) => {
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:8000/api/tasks/${id}`)
      console.log("button")
      if (response.status === 200) { 
        setOpenDialog(false);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <>
      <div className='taskcard-outer-div'>
        <div className='taskcard-outer-div-1'>
          <div
            className={clsx(
              "taskcard-inner-div",
              PRIOTITYSTYELS[task?.priority]
            )}
          >
            <span className={`status-bullet ${task?.stage}`}></span>
            <span className='uppercase'>{task?.priority} Priority</span>
            <div className="moreoptions">
              <Menu as="div" className="moreoption-div">
                <div>
                  <Menu.Button className="moreoption-button">...</Menu.Button>
                </div>
                <Transition as={Fragment}>
                  <Menu.Items className="moreoption-menu">
                    <div className="px-1-py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={handleEdit} className="inner-option">
                            <FaEdit className="mr-2" aria-hidden="true" />
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={deleteButtonClick} className="inner-option">
                            <FaTrashAlt className="mr-2" aria-hidden="true" />
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          {user?.isAdmin && <TaskDialog task={task} />}
        </div>

        <div className='taskcard-formatdate-div'>
          <div className={clsx("taskcard-taskstage", TASK_TYPE[task.stage])} />
          <h4 className='taskcard-format-div-h4'>{task?.title}</h4>
        </div>
        <span className='taskcard-formatdate-span'>
          {formatDate(new Date(task?.date))}
        </span>
        <div className='taskcard-bimsgdetail' />
        <div className='taskcard-bimsgdetail-outer-1'>
          <div className='taskcard-bimsgdetail-outer-2'>
            
          <div className='mdattachfile' onClick={() => task?.assets?.length > 0  && window.open(`http://localhost:8000/api/tasks/assets/${task._id}/${task?.assets[0]}`)}>
    <MdAttachFile />
    <span>{task?.assets?.length || 0}</span>
</div>
            
          </div>

          <div className='taskcard-userinfo'>
            {/* {task?.team?.map((m, index) => ( */}
            {Array.isArray(task?.team) && task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "taskcard-userinfo-inner",
                  BGS[index % BGS?.length]
                )}
              >
                    <UserInfo user={getUserById(m)} />
                
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={() => deleteHandler(selected)}
    />
      {open && editTask && <EditTask open={open} setOpen={setOpen} task={editTask}  setTasks={setTasks}/>}
    </>
  );
};

export default TaskCard;