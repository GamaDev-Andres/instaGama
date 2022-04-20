import propTypes from 'prop-types';
import { useRef } from 'react/cjs/react.development';
import { useAuthContext } from '../../hooks/useAuthContext';
import useUpdateCloudinary from '../../hooks/useUpdateCloudinary';
import HeroImage from '../HeroImage';

const ModalCreatePost = ({ handleCloseModal }) => {
  const descripcion = useRef('');

  const {
    data,
    loading,
    handleOpen: handleOpenWidget,
  } = useUpdateCloudinary(true);
  const {
    state: {
      user: { name, foto },
    },
    createPost,
  } = useAuthContext();
  const handleUploadPhoto = () => {
    handleOpenWidget();
  };
  const handlePost = async () => {
    const post = await createPost({
      url: data[0],
      descripcion: descripcion.current,
    });
    console.log('?');
    console.log(post);
    handleCloseModal();
  };
  const handleDescripcion = (e) => {
    descripcion.current = e.target.textContent;
  };
  return (
    <div className="flex flex-col">
      <div className="p-4 pb-0">
        <h1 className="text-center font-bold text-xl">Crear publicación</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-start items-center w-full p-4">
          <HeroImage url={foto} className="w-[32px]" />
          <h3 className="ml-2 font-semibold font-sans">{name}</h3>
        </div>
        <div
          autoFocus
          onInput={handleDescripcion}
          contentEditable
          className="px-4 outline-none"
        ></div>
        {data && (
          <div className="w-full">
            <img className="w-full object-cover" src={data[0]} />
          </div>
        )}
      </div>
      <div className="center">
        {data && (
          <button
            onClick={handlePost}
            className="flex-grow p-2 h-12 text-center text-sm"
          >
            Publicar
          </button>
        )}
        <button
          onClick={handleUploadPhoto}
          disabled={loading}
          className="flex-grow p-2 h-12 text-center text-sm"
        >
          {data ? 'Cambiar Foto' : ' Agregar Foto'}
        </button>
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

ModalCreatePost.propTypes = {
  handleCloseModal: propTypes.func.isRequired,
};

export default ModalCreatePost;
