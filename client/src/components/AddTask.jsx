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

const AddTask = ({ open, setOpen ,setTasks}) => {

  const task = "";
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [team, setTeam] = useState([]);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Request to get the users
    axios.get('http://localhost:8000/api/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (e) => {
    setAssets(e.target.files);
    // if(Array.isArray(team)) setTeam(team.join(','));
  };

const emptyForm = () => {
  setTitle("");
  setDate("");
  setTeam([]);
  setStage(LISTS[0]);
  setPriority(PRIORITY[2]);
  setAssets([]);
};

const submitHandler = async (e) => {
  e.preventDefault();
  if (title === "" || date === "") {
      alert("Both title and date are required");
      return;
  }

  // Creating FormData to handle file uploads
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
  // for (let i = 0; i < assets.length; i++) {
  //     data.append('assets', assets[i]);
  // }

  try {
      for (let i = 0; i < assets.length; i++) {
          data.append('assets', assets[i]);
      }
       const response=await axios.post('http://localhost:8000/api/tasks', data);
       setOpen(false);
       const updatedTasks = await axios.get('http://localhost:8000/api/tasks'); //fetch all tasks
       setTasks(updatedTasks.data);
       emptyForm();
      
  } catch (err) {
      console.error(err);
  }
};


  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form className="addTaskModal" onSubmit={(e) => submitHandler(e)}>
          <div className="add_task_div">
            <h2>ADD TASK</h2>
            <Textbox
              placeholder='Task Title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name='title'
              label='Task Title'
              className='task_title input1'
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
    </>
  );
};

export default AddTask;

