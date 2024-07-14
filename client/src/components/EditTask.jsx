import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModelWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import UserList from "./UserList";
import SelectList from "./SelectList";
import { BiImages } from "react-icons/bi";
import Button from "./Button";
import axios from 'axios';
import "../styles/AddTask.css";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const EditTask = ({ open, setOpen, task, setTasks }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [team, setTeam] = useState([]);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTitle(task?.title);
    setDate(task?.date);
    setTeam(task?.team || []);
    setStage(task?.stage?.toUpperCase() || LISTS[0]);
    setPriority(task?.priority?.toUpperCase() || PRIORITY[2]);
    setAssets(task?.assets || []);

    axios.get('http://localhost:8000/api/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.error(err));
  }, [task]);

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (title === "" || date === "") {
      alert("Both title and date are required");
      return;
    }
    const data = new FormData();
    data.append('title', title);
    data.append('date', date);

    if(Array.isArray(team)) {
      team.forEach(user_id => {
        data.append('team', user_id);
      });
    } else {
      data.append('team', team);
    }

    data.append('stage', stage);
    data.append('priority', priority);
    for (let i = 0; i < assets.length; i++) {
      data.append('assets', assets[i]);
    }

    try {
      await axios.put(`http://localhost:8000/api/tasks/${task._id}`, data);
      const updatedTasks = await axios.get('http://localhost:8000/api/tasks');
      setTasks(updatedTasks.data);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form data-testid="edit-task-form" className="addTaskModal" onSubmit={(e) => submitHandler(e)}>
        <div className="add_task_div">
          <h2>EDIT TASK</h2>
          <Textbox
            placeholder='Task Title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name='title'
            label='Task Title'
            className='task_title input1'
            data-testid='task-title'
          />
          <div className="task_row2">
            <SelectList
              label='Task Stage'
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
              className='addTask_wFull'
            />
            <Textbox
              placeholder='Date'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name='date'
              label='Task Date'
              className='addTask_wFull'
              data-testid='task-date'
            />
          </div>
          <UserList
            setTeam={setTeam}
            team={team}
          />
          <div className="task_row3">
            <SelectList
              label='Priority Level'
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />
            <label className='addTask_inputLabel label1' htmlFor='imgUpload'>
              <input
                type='file'
                id='imgUpload'
                onChange={(e) => handleSelect(e)}
                accept='.jpg, .png, .jpeg, .pdf'
                className="hidden input1"
                multiple={true}
              />
              <BiImages />
              <span>Add Assets</span>
            </label>
          </div>
          <div className='addTask_bgGray sm:flex'>
            {uploading ? (
              <span className='text-sm py-2 text-red-500'>Uploading assets</span>
            ) : (
              <Button
                label='Submit'
                type='submit'
                className='addTask_buttonSubmit'
              />
            )}

            <Button
              type='button'
              onClick={() => setOpen(false)}
              label='Cancel'
              className='addTask_buttonCancel'
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditTask;