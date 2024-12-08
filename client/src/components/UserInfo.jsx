import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { getInitials } from "../utils";
import "../styles/UserInfo.css"
const UserInfo = ({ user }) => {
  if (!user || !user.name) return null;
  return (
    <div className='px-4'>
      <Popover className='relative'>
        {/* {({ open }) => ( */}
        <>
          <Popover.Button className='popover'>
            <span>{getInitials(user?.name)}</span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter='enter'
            enterFrom='enterfrom'
            enterTo='enterto'
            leave='leave'
            leaveFrom='leavefrom'
            leaveTo='leaveto'
          >
            <Popover.Panel className='popover-panel'>
              <div className='popover-panel-div1'>
                <div className='popover-panel-div2 '>
                  <span className='popover-panel-span'>
                    {getInitials(user?.name)}
                  </span>
                </div>
                <div className='user-div'>
                  <p className='user-name'>{user?.name}</p>
                  <span className='user-title'>{user?.role}</span>
                  <span className='user-email'>
                    {user?.email ?? "email@example.com"}
                  </span>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
        {/* )} */}
      </Popover>
    </div>
  );
};

export default UserInfo;