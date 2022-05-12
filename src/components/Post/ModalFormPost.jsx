import propTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

import { useAuthContext } from '../../hooks/useAuthContext';
import { usePostMethods } from '../../hooks/usePostMethods';
import useUpdateCloudinary from '../../hooks/useUpdateCloudinary';
import HeroImage from '../HeroImage';
import Spinner from '../Spinner';
import usePost from './hook/usePost';

const ModalFormPost = ({
  handleCloseModal,
  edit = false,
  dataEdit = null,
  handleToogleEdit,
}) => {
  const descripcion = useRef();
  const [loadingShare, setLoadingShare] = useState(false);
  const {
    data,
    loading,
    handleOpen: handleOpenWidget,
  } = useUpdateCloudinary(true);
  const {
    state: {
      user: { name, foto },
    },
  } = useAuthContext();
  const { createPost } = usePostMethods();
  const { updatePost } = usePost();

  useEffect(() => {
    if (edit && dataEdit.descripcion) {
      descripcion.current.textContent = dataEdit.descripcion;
    }
    return () => {
      if (handleToogleEdit) {
        handleToogleEdit();
      }
    };
  }, []);

  const handleUploadPhoto = () => {
    handleOpenWidget();
  };
  const handlePost = async () => {
    setLoadingShare(true);
    if (edit) {
      await updatePost(dataEdit.id, descripcion.current.textContent);
    } else {
      await createPost({
        url: data[0],
        descripcion: descripcion.current.textContent,
      });
    }
    setLoadingShare(false);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 pb-0">
        <h1 className="text-center font-bold text-xl">
          {edit ? 'Editando Publicación' : 'Crear publicación'}
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-start items-center w-full p-4">
          <HeroImage url={foto} className="w-[32px]" />
          <h3 className="ml-2 font-semibold font-sans">{name}</h3>
        </div>
        <div
          ref={descripcion}
          autoFocus
          contentEditable
          className="px-4 outline-none"
        ></div>
        {(dataEdit?.foto || data) && (
          <div className="w-full">
            <img
              className="w-full object-cover"
              src={dataEdit?.foto || data[0]}
            />
          </div>
        )}
      </div>
      <div className="center">
        {(dataEdit?.foto || data) && (
          <button
            onClick={handlePost}
            className="flex-grow p-2 h-12 text-center text-sm"
            disabled={loadingShare}
          >
            {loadingShare ? <Spinner /> : 'Publicar'}
          </button>
        )}
        {!edit && (
          <button
            onClick={handleUploadPhoto}
            disabled={loading}
            className="flex-grow p-2 h-12 text-center text-sm"
          >
            {data ? 'Cambiar Foto' : ' Agregar Foto'}
          </button>
        )}
        <button
          onClick={handleCloseModal}
          className="flex-grow p-2 h-12 text-center text-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

ModalFormPost.propTypes = {
  handleCloseModal: propTypes.func.isRequired,
  handleToogleEdit: propTypes.func,
  edit: propTypes.bool,
  dataEdit: propTypes.object,
};

export default ModalFormPost;
