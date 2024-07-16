import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import axios from "axios";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "./../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import Button from "./Button";
import ConfirmatioDialog from "./Dialogs";
import "../styles/Table.css"
import EditTask from "./EditTask.jsx";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks, getUserById ,setTasks}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null)
  const handleEdit = (task) => {
    setEditTask(task);
    setOpen(true);
  };

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = async(id) => {
    try {
      console.log(id);
      const response = await axios.delete(`http://10.66.65.17:8000/api/tasks/${id}`)
      console.log("button")
      if (response.status === 200) { 
        setOpenDialog(false);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const TableHeader = () => (
    <thead className='table-header-class'>
      <tr className='table-header-rowclass'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2 line-clamp-1'>Due Date</th>
        <th className='py-2'>Assets</th>
        <th className='py-2'>Team</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task, getUserById, getTasks,handleEdit,deleteHandler }) => (
    <tr className='table-tablerow'>
      <td className='py-2'>
      <div className='table-taskdiv'>
          <div className={'task-status-container'}>
            <span className={`status-bullet ${task?.stage}`}></span>
            <p className={clsx("table-task-title")}>
              {task?.title}
            </p>
          </div>
        </div>
      </td>

      <td className='py-2'>
        <div className={"table-task-priority-outer"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className='table-task-priority'>
            {task?.priority} Priority
          </span>
        </div>
      </td>

      <td className='py-2'>
        <span className='table-date'>
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className='py-2'>
        <div className='table-task-msgdiv'>
          <div className='table-asset'>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
        {Array.isArray(task?.team) && task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "table-userinfo",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={getUserById(m)} />
            </div>
          ))}
        </div>
      </td>

      <td className='table-button'>
        <Button
          className='edit-button'
          label='Edit'
          onClick={()=>handleEdit(task)}
          type='button'
        />

        <Button
          className='delete-button'
          label='Delete'
          type='button'
          data-testid='modal-delete-button'
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );
  return (
    <>
      <div className='table-inner'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} getUserById={getUserById} setTasks={setTasks} handleEdit={handleEdit}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODO */}
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={() => deleteHandler(selected)}
      />
          {open && editTask && <EditTask open={open} setOpen={setOpen} task={editTask} setTasks={setTasks}/>}
        
    </>
  );
};

export default Table;