import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import "../styles/SelectList.css"

const SelectList = ({ lists, selected, setSelected, label }) => {
  return (
    <div className='w-full'>
      {label && <p className='label'>{label}</p>}

      <Listbox value={selected} onChange={setSelected}>
        <div className='listbox-outer-div'>
          <Listbox.Button className='listbox-button'>
            <span className='block-truncate'>{selected}</span>
            <span className='selectlist-expand-span'>
              <BsChevronExpand
                className='selectlist-expand'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='leave'
            leaveFrom='leavefrom'
            leaveTo='leaveto'
          >
            <Listbox.Options className='list-map'>
              {lists.map((list, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `listmap ${
                      active ? "color-class" : "text-gray-900"
                    }`
                  }
                  value={list}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block-truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {list}
                      </span>
                      {selected ? (
                        <span className='mdcheck-span'>
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

export default SelectList;