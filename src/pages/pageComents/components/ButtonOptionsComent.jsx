import propTypes from 'prop-types';
import { useState } from 'react';

import ModalEditComent from './ModalEditComent';
import ModalOptionsComent from './ModalOptionsComent';

const ButtonEditComent = ({ text, idComent }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpenModal(true);
        }}
        className="p-2 pt-0 text-sm"
      >
        <i className="fa-solid fa-ellipsis"></i>
      </button>
      {isOpenModal === true && (
        <ModalOptionsComent
          idComent={idComent}
          openModalEditComent={() => setIsOpenModal('editComent')}
          closeModal={() => setIsOpenModal(false)}
        />
      )}
      {isOpenModal === 'editComent' && (
        <ModalEditComent
          idComent={idComent}
          text={text}
          closeModal={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};
ButtonEditComent.propTypes = {
  idComent: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
};
export default ButtonEditComent;
