import { useState } from 'react';

import Modal from '../../../components/Modal';
import ChangeName from './ChangeName';
import ChangePassword from './ChangePassword';

const ButtonEditProfile = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal('options');
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="w-full max-w-[250px] font-semibold font-sans border text-sm border-bordes py-[5px] px-[9px] rounded-md"
      >
        Editar perfil
      </button>
      {isOpenModal && (
        <Modal closeModal={handleCloseModal}>
          {isOpenModal === 'options' && (
            <div className="flex flex-col text-sm">
              <button
                onClick={() => setIsOpenModal('password')}
                className="font-semibold py-4 font-sans border-b border-bordes"
              >
                Cambiar contraseña
              </button>
              <button
                onClick={() => setIsOpenModal('changeName')}
                className="font-semibold py-4 font-sans  border-b border-bordes"
              >
                Cambiar nombre
              </button>
              <button onClick={handleCloseModal} className="py-4 font-sans">
                Cancelar
              </button>
            </div>
          )}
          {isOpenModal === 'password' && (
            <ChangePassword handleCloseModal={handleCloseModal} />
          )}
          {isOpenModal === 'changeName' && (
            <ChangeName handleCloseModal={handleCloseModal} />
          )}
        </Modal>
      )}
    </>
  );
};

export default ButtonEditProfile;
