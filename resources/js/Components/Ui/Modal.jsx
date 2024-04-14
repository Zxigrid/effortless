import React from 'react'

const Modal = ({Icon, title, description, approve, cancel, id}) => {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        <small className="font-semibold absolute top-2 right-5 sm:top-1 sm:right-2 opacity-50">
          ESC
        </small>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="modal-icon-error">
            <Icon className="w-5 h-5" />
          </span>
          <h1 className="font-semibold text-center text-xl">{title}</h1>
        </div>
        <p className="text-center text-base mt-2">{description}</p>
        <div className="modal-action mt-5">
          <form method="dialog" className="w-full flex items-center justify-center gap-4">
            {/* if there is a button in form, it will close the modal */}
            {/*
            <button className="btn-modal-approve error">
              Yakin
            </button> */}
            {approve}
            {cancel}
          </form>
        </div>
      </div>
    </dialog>

  )
}

export default Modal
