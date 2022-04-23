import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { useAuthContext } from '../hooks/useAuthContext';
import Modal from './Modal';
import ModalFormPost from './Post/ModalFormPost';

const NavBarPhone = () => {
  const {
    state: {
      user: { userName },
    },
  } = useAuthContext();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <nav className="center fixed bottom-0 left-0 w-screen bg-fondoClaro h-11 border-t border-bordes">
      <div className="flex w-full h-full">
        <Link className="center flex-grow " to="/">
          <i className="fa-solid fa-house w-6 h-6 text-xl center"></i>
        </Link>
        <Link className="center flex-grow " to="/search">
          <i className="fa-solid fa-magnifying-glass w-6 h-6 text-xl center"></i>
        </Link>
        <button
          onClick={handleOpenModal}
          className="center flex-grow"
          title="crear publicación"
        >
          <i className="fa-solid fa-circle-plus w-6 h-6 text-xl center"></i>{' '}
        </button>
        <Link className="center flex-grow " to="/inbox">
          <i className="fa-solid fa-message w-6 h-6 text-xl center"></i>{' '}
        </Link>
        <Link className="center flex-grow " to={`/${userName}`}>
          <i className="fa-solid fa-user w-6 h-6 text-xl center"></i>
        </Link>
      </div>
      {isOpenModal && (
        <Modal closeModal={handleCloseModal}>
          <ModalFormPost handleCloseModal={handleCloseModal} />
        </Modal>
      )}
    </nav>
  );
};

export default NavBarPhone;
