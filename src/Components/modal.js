import React from 'react';
import ReactDom from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="w-full h-full fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]"
        onClick={onClose}
      />
      <div className="p-5 bg-slate-400 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]z-[1000] ">
        <button onClick={onClose} className="absolute top-[-20px] right-[-20px]">
          <AiOutlineClose size={'20px'} color={'#FFFFFF'} />
        </button>
        {children}
      </div>
    </>,
    document.getElementById('portal'),
  );
};

export default Modal;
