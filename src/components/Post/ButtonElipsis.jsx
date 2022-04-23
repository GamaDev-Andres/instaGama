import { useState, useRef, useEffect } from 'react';

import Modal from '../Modal';
import usePost from './hook/usePost';
import ModalFormPost from './ModalFormPost';
import OptionsConfigPost from './OptionsConfigPost';

const ButtonElipsis = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const { deletePost, url, descripcion, _id } = usePost();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleDeletePost = async () => {
    setLoadingDelete(true);
    await deletePost();
    if (isMounted.current) {
      setLoadingDelete(false);
    }
  };

  const handleToogleEdit = () => {
    setEdit(!edit);
  };
  const dataEdit = {
    id: _id,
    descripcion,
    foto: url,
  };
  return (
    <>
      <button onClick={handleOpenModal} className="p-2 text-xl">
        <i className="fa-solid fa-ellipsis"></i>
      </button>
      {isOpen && (
        <Modal closeModal={handleCloseModal}>
          {edit ? (
            <ModalFormPost
              handleCloseModal={handleCloseModal}
              edit={edit}
              dataEdit={dataEdit}
              handleToogleEdit={handleToogleEdit}
            />
          ) : (
            <OptionsConfigPost
              handleDeletePost={handleDeletePost}
              handleCloseModal={handleCloseModal}
              handleToogleEdit={handleToogleEdit}
              loadingDelete={loadingDelete}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default ButtonElipsis;
