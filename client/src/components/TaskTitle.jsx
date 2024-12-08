import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import "../styles/TaskTitle.css"

const TaskTitle = ({ label, className }) => {
  return (
    <div className='task-title'>
      <div className='task-title-inner'>
        <div className={clsx("task-title-div", className)} />
        <p className='task-title-p'>{label}</p>
      </div>

      <button className='hidden'>
        <IoMdAdd className='task-title-icon' />
      </button>
    </div>
  );
};

export default TaskTitle;