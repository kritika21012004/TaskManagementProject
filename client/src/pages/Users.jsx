import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { getInitials } from "../utils";
import axios from "axios"
import clsx from "clsx";
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import "../styles/Users.css"

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                const usersData = response.data;
                setUsers(usersData.map(user => {
                    return { ...user, tasks: user.tasks.join(", ") }
                }));
                setIsLoading(false);

            }).catch(error => {
                
                console.error(`Error fetching data: ${error}`);
                setIsLoading(false);

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
    
    const TableRow = ({ user }) => (
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
            <td className='p-2-tasks'>{user.tasks}</td>
        </tr>
    );
  
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
                        {isLoading ? <p>Loading...</p> : (
                            <table className='w-full-mb-5'>
                                <TableHeader />
                                <tbody>
                                    {users.map((user, index) => (
                                        <TableRow key={index} user={user} />
                                    ))}
                                </tbody>
                            </table>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Users;

