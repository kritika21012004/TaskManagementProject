import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddTask from "./AddTask";
import ConfirmatioDialog from "./Dialogs";
import "../styles/TaskDialog.css"


const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const deleteClicks = () => { };

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className='opentask-class' aria-hidden='true' />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className='opentask-class' aria-hidden='true' />,
      onClick: () => setOpenEdit(true),
    },

  ];

  return (
    <>
      <div>
        <Menu as='div' className='taskdialog-div'>
          <Menu.Button className='taskdialog-menubutton'>
            <BsThreeDots />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='enter'
            enterFrom='enterfrom'
            enterTo='enterto'
            leave='leave'
            leaveFrom='leavefrom'
            leaveTo='leaveto'
          >
            <Menu.Items className='menuitem-map'>
              <div className='menuitem-map-div'>
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${active ? "button-active" : "button-notactive"
                          } buttonclick`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className='delete-div'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={`${active ? "delete-active" : "delete-inactive"
                        } delete-button`}
                    >
                      <RiDeleteBin6Line
                        className='deletebutton'
                        aria-hidden='true'
                      />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        key={new Date().getTime()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
      />
    </>
  );
};

export default TaskDialog;