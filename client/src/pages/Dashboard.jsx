import React from "react";
import {
    MdAdminPanelSettings,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";
import "../styles/Dashboard.css"
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { FaBug, FaCheck, FaTasks, FaSpinner } from 'react-icons/fa';

const icon = <FaTasks/>;
const bg = 'red';

const TaskTable = ({ tasks, getUserById }) => {
    const ICONS = {
        high: <MdKeyboardDoubleArrowUp />,
        medium: <MdKeyboardArrowUp />,
        low: <MdKeyboardArrowDown />,
    };

    const TableHeader = () => (
        <thead className='table-header'>
            <tr className='table-row'>
                <th className='table-heading'>Task Title</th>
                <th className='table-heading'>Priority</th>
                <th className='table-heading'>Team</th>
                <th className='table-heading-inner'>Due Date</th>
            </tr>
        </thead>
    );

    const TableRow = ({ task }) => (
        <tr className='table-row-2'>
            <td className='table-heading'>
                <div className='table-task1'>
                    <div
                        className={clsx("task-type", TASK_TYPE[task.stage])}
                    />
                    <span className={`status-bullet ${task?.stage}`}></span>
                    <p className='task-title'>{task.title}</p>
                </div>
            </td>

            <td className='table-heading'>
                <div className="task-priority-1">
                    <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
                        {ICONS[task.priority]}
                    </span>
                    <span className='capitalize'>{task.priority}</span>
                </div>
            </td>

            <td className='table-heading'>
                <div className='flex'>
                    {task.team?.map((m, index) => (
                        <div
                            key={index}
                            className={clsx(
                                "task-team button1",
                                BGS[index % BGS.length]
                            )}
                        >
                            <UserInfo user={getUserById(m)} />
                        </div>
                    ))}
                </div>
            </td>
            <td className='task-date-1'>
                <span className='task-date-2'>
                    {moment(task?.date).fromNow()}
                </span>
            </td>
        </tr>
    );
    return (
        <>
            <div className='task'>
                <table className='w-full'>
                    <TableHeader />
                    <tbody>
                        {tasks?.map((task, id) => (
                            <TableRow key={id} task={task} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const UserTable = ({ users }) => {
    const TableHeader = () => (
        <thead className='user-table1'>
            <tr className='user-table2'>
                <th className='table-heading'>Full Name</th>
                <th className='table-heading'>Role</th>
            </tr>
        </thead>
    );

    const TableRow = ({ user }) => (
        <tr className='table-row-user'>
            <td className='table-heading'>
                <div className='table-row-user2'>
                    <div className='get-initial'>
                        <span className='text-center'>{getInitials(user?.name)}</span>
                    </div>

                    <div>
                        <p> {user.name}</p>
                    </div>
                </div>
            </td>

            <td>
                <p> <span className='user-role'>{user?.role}</span></p>
            </td>

        </tr>
    );

    return (
        <div className='table-header-1'>
            <table className='w-full-mb-5'>
                <TableHeader />
                <tbody>
                    {users?.map((user, index) => (
                        <TableRow key={index + user?._id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
const Dashboard = () => {



    const [tasks, setTasks] = useState([]);
    const [usersList, setUsers] = useState([]);
    const [taskCounts, setTaskCounts] = useState({ totalTasks: 0, inProgressTasks: 0, todoTasks: 0, completedTasks: 0 });

    useEffect(() => {
        axios.get('http://localhost:8000/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.log(error));

        axios.get('http://localhost:8000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error));

        axios.get('http://localhost:8000/api/total_tasks_count')
        .then(response => {
          setTaskCounts(prevState => ({ ...prevState, totalTasks: response.data['Total Tasks'] }))
        });

        axios.get('http://localhost:8000/api/inprogress_task_count')
        .then(response => {
            setTaskCounts(prevState => ({ ...prevState, inProgressTasks: response.data['In progress Tasks'] }));
        });
    
        axios.get('http://localhost:8000/api/todo_task_count')
        .then(response => {
            setTaskCounts(prevState => ({ ...prevState, todoTasks: response.data['Todo Tasks'] }));
        });
    
        axios.get('http://localhost:8000/api/completed_task_count')
        .then(response => {
            setTaskCounts(prevState => ({ ...prevState, completedTasks: response.data['Completed Tasks'] }));
        });
    }, []);

    const getUserById = (userId) => {
        return usersList.find(user => user._id === userId);
    };

    const Card = ({ label, count, bg, icon }) => {
        return (
            <div className='card1'>
                <div className='card2'>
                    <p className='card3'>{label}</p>
                    <span className='card4'>{count}</span>
                </div>

                <div
                    className={clsx(
                        "bg",
                        bg
                    )}
                >
                    {icon}
                </div>
            </div>
        );
    };
    return (
        <div className="dashboard-container">
            <div className="main-content">

                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="dashboard-content">
                    <div className="navbar">
                        <Navbar />
                    </div>
                    <div classNamee='card-div1'>
                        <div className='card-div2'>
                        {/* {stats.map(({ icon, bg, label, total }, index) => (
                            <Card key={index} icon={icon} bg={bg} label={label} count={total} />
                        ))} */}

                <Card key="1" icon={icon} bg={bg} label="Total Tasks" count={taskCounts.totalTasks} />
                <Card key="2" icon={icon} bg={bg} label="In Progress Tasks" count={taskCounts.inProgressTasks} />
                <Card key="3" icon={icon} bg={bg} label="To Do Tasks" count={taskCounts.todoTasks} />
                <Card key="4" icon={icon} bg={bg} label="Completed Tasks" count={taskCounts.completedTasks} />
                    </div>


                        <div className='class-left'>
                            {/* /left */}

                            <TaskTable getUserById={getUserById} tasks={tasks} />

                            {/* /right */}
                            <UserTable users={usersList} />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;