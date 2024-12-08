import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import "../styles/ModelWrapper.css"
import React from "react";


const ModalWrapper = ({ open, setOpen, children,className }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='modelwrapper-dialog'
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='enter'
          enterFrom='enterfrom'
          enterTo='enterto'
          leave='leave'
          leaveFrom='leavefrom'
          leaveTo='leaveto'
        >
          <div className='transition-child' />
        </Transition.Child>

        <div className='transition-child-1'>
          <div className='transition-child-2'>
            <Transition.Child
              as={Fragment}
              enter='tenter'
              enterFrom='tenterfrom'
              enterTo='tenterto'
              leave='tleave'
              leaveFrom='tleavefrom'
              leaveTo='tleaveto'
            >
              <Dialog.Panel className='dialog-panel'>
                <div className='dialog-panel-div1'>
                  <div className='dialog-panel-div2'>
                    <div className='dialog-panel-div3'>
                      {children}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;