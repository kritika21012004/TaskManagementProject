import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import clsx from "clsx";
import { getInitials } from "../utils";
import { MdCheck } from "react-icons/md";
import axios from "axios";
import "../styles/UserList.css"

const UserList = ({ setTeam, team }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(res => {setUsers(res.data);
        console.log(res.data); 
  })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (el) => {
    setSelectedUsers(el);
    setTeam(el?.map((u) => u._id));
  };

  useEffect(() => {
    if (team?.length < 1) {
      setSelectedUsers([]);
    } else if (team) {
      setSelectedUsers(users.filter(user => team.includes(user._id)));
    }
  }, [users, team]);

  return (
    <div>
      <p className='text-gray-700'>Assign Task To: </p>
      <Listbox
        value={selectedUsers}
        onChange={(el) => handleChange(el)}
        multiple
      >
        <div className='relative-mt-1'>
          <Listbox.Button className='listbox'>
            <span className='block-truncate'>
              {selectedUsers?.map((user) => user.name).join(", ")}
            </span>
            <span className='listbox-span'>
              <BsChevronExpand className='listbox-expand' aria-hidden='true' />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='leave-from'
            enterFrom='enter-from'
            enterTo='enter-to'
            leaveTo='leave-to'
          >
            <Listbox.Options className='data-map-listbox'>
              {users?.map((user, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `data-listbox ${ active ? "element" : "gray" }`
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div className={clsx("font-class", selected ? "font-medium" : "font-normal")}>
                        <div className='getinitial-div'>
                          <span className='getinitial-span'>
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <span>{user.name}</span>
                      </div>
                      {selected ? (
                        <span className='selected-span'>
                          <MdCheck className='h-5-w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default UserList;

