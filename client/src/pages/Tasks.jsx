import React, { useState,useEffect } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import axios from "axios";
import Table from "../components/Table";
import AddTask from "../components/AddTask";
import "../styles/Tasks.css"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-500",
  "in progress": "bg-orange-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);  

  const status = params?.status || "";
  const [tasks, setTasks] = useState([]); // Change this line
  useEffect(() => {
    setLoading(true);
    axios.get('http://10.66.67.132:8000/api/users') // Update with your API endpoint
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching users', error);
          setLoading(false);
        });
  }, []);


  const getTasks = async () => {
    try {
      const response = await axios.get('http://10.66.67.132:8000/api/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks', err);
    }
  }
  
  // same for useEffect to remove redundancy
  useEffect(() => {
    getTasks();
  }, []);

  const getUserById = (id) => {
    const user = users.find(user => user._id === id);
    return user;
    
  }

  useEffect(() => {
    setLoading(true);
    axios.get('http://10.66.67.132:8000/api/tasks')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks', error);
        setLoading(false);
      });
  }, []);


  return loading ? (
    <div className='py-10' data-testid="loader">
      <Loading />
    </div>
  ) : (
    <div className="main-content">

      <div className="sidebar">
        <Sidebar />
      </div>

      <div className='task-main-div'>
          <Navbar />
        <div className='task-status'>
          <Title title={status ? `${status} Tasks` : "Tasks"} />

          {!status && (
            <Button
              onClick={() => setOpen(true)}
              label='Create Task'
              icon={<IoMdAdd className='text-lg' />}
              className='create-task'
            />
          )}
        </div>

        <Tabs tabs={TABS} setSelected={setSelected}>
          {!status && (
            <div className='in-progress'>
              <TaskTitle label='To Do' className={TASK_TYPE.todo} />
              <TaskTitle
                label='In Progress'
                className={TASK_TYPE["in progress"]}
              />
              <TaskTitle label='completed' className={TASK_TYPE.completed} />
            </div>
          )}

          {selected !== 1 ? (
               <BoardView tasks={tasks} getUserById={getUserById} setTasks={setTasks}  />
          ) : (
            <div className='w-full'>
               <Table tasks={tasks} getUserById={getUserById} setTasks={setTasks} />
            </div>
          )}
        </Tabs>

        <AddTask open={open} setOpen={setOpen} tasks={tasks} setTasks={setTasks} data-testid={open ? "addtask-component" : undefined}/>
      </div>

    </div>
  );
};

export default Tasks;