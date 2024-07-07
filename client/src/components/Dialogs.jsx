import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModelWrapper";
import Button from "./Button";
import "../styles/Dialogs.css"
import "../styles/ModelWrapper.css"

export default function ConfirmatioDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='modelwrapper-div-1 deletedialogclass'>
          <Dialog.Title as='h3' className=''>
            <p
              className={clsx(
                "p-3 rounded-full ",
                type === "restore" || type === "restoreAll"
                  ? "restore"
                  : "restore-all"
              )}
            >
              <FaQuestion  className="questionmark" size={60} />
            </p>
          </Dialog.Title>

          <p className='delete-msg'>
            {msg ?? "Are you sure you want to delete the selected record?"}
          </p>

          <div className='restore-div'>
            <Button
              type='button'
              className={clsx(
                " restore-class",
                type === "restore" || type === "restoreAll"
                  ? "restore"
                  : "restore-all"
              )}
              onClick={onClick}
              label={type === "restore" ? "Restore" : "Delete"}
            />

            <Button
              type='button'
              className='cancel-button'
              onClick={() => closeDialog()}
              label='Cancel'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='modalwrapper-div'>
          <Dialog.Title as='h3' className=''>
            <p className={clsx("faquestion")}>
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>
          <p className='activate-deactivate'>
            {"Are you sure you want to activate or deactive this account?"}
          </p>

          <div className='close-button-div'>
            <Button
              type='button'
              className={clsx(
                "button-no"
              )}
              onClick={onClick}
              label={"Yes"}
            />

            <Button
              type='button'
              className='close-dialog'
              onClick={() => closeDialog()}
              label='No'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}