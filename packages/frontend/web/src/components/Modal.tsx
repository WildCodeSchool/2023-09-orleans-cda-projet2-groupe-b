import type { ReactNode } from 'react';

interface ModalProps {
  readonly openModal: boolean;
  readonly onClose: () => void;
  readonly children: ReactNode;
}

export const Modal = ({ openModal, onClose, children }: ModalProps) => {
  return (
    <div
      onClick={onClose}
      className={`
      fixed inset-0 flex items-center justify-center transition-colors
      ${openModal ? 'visible bg-black/50' : 'invisible'}
    `}
    >
      <div
        onClick={() => {
          openModal;
        }}
        className={`
        rounded-xl bg-[#A0B6C5] p-6 shadow transition-all sm:w-[50%] lg:w-[35%]
        ${openModal ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
      `}
      >
        <button
          onClick={onClose}
          className='absolute right-2 top-2 h-10 w-10 rounded-lg bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600'
        >
          <img src='./icons/cross.svg' />
        </button>
        {children}
      </div>
    </div>
  );
};
