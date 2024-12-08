import React from "react";
import TaskCard from "./TaskCard";
import "../styles/BoardView.css"


const BoardView = ({ tasks, getUserById,setTasks  }) => {
  return (
    <div className='board-view'>
    {tasks && tasks.length > 0 && tasks.map((task, index) => (
      <TaskCard task={task} key={index} getUserById={getUserById} setTasks={setTasks} />
    ))}
  </div>
  );
};

export default BoardView;