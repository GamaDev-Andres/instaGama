import { useState } from 'react';
import Modal from '../Modal';
import OptionsConfigPost from './OptionsConfigPost';

const ButtonElipsis = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={handleOpenModal} className="p-2 text-xl">
        <i className="fa-solid fa-ellipsis"></i>
      </button>
      {isOpen && (
        <Modal closeModal={handleCloseModal}>
          <OptionsConfigPost handleCloseModal={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default ButtonElipsis;
