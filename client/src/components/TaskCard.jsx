import clsx from "clsx";
import React, { useState, useContext, Fragment } from "react";
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
import { FaList, FaEdit, FaTrashAlt } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { Menu, Transition } from "@headlessui/react";
import ConfirmatioDialog from "./Dialogs";
import { AuthContext } from '../AuthContext.js';
import "../styles/TaskCard.css"
import EditTask from "./EditTask.jsx";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task, getUserById, setTasks }) => {
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

  const deleteHandler = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(`http://10.66.65.17:8000/api/tasks/${id}`)
      console.log("button")
      if (response.status === 200) {
        console.log(response.status)
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

            <div className='mdattachfile' onClick={() => task?.assets?.length > 0 && window.open(`http://10.66.65.17:8000/api/tasks/assets/${task._id}/${task?.assets[0]}`)}>
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
      {open && editTask && <EditTask open={open} setOpen={setOpen} task={editTask} setTasks={setTasks} />}
    </>
  );
};

export default TaskCard;