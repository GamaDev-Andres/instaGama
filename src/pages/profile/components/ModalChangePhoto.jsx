import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

import HeroImage from '../../../components/HeroImage';
import Modal from '../../../components/Modal';
import useUpdateCloudinary from '../../../hooks/useUpdateCloudinary';
import useProfile from '../hook/useProfile';

const ModalChangePhoto = ({ handleCloseModal }) => {
  const {
    updateUser,
    state: { foto },
  } = useProfile();
  const [loadingQuitar, setLoadingQuitar] = useState(null);
  const {
    data,
    loading,
    handleOpen: handleOpenCloudinary,
  } = useUpdateCloudinary();

  useEffect(() => {
    if (data) {
      updateUser({ foto: data[0] });
    }
  }, [data]);

  const handleQuitarFoto = async () => {
    setLoadingQuitar(true);
    await updateUser({
      foto: 'https://res.cloudinary.com/dapa84kxy/image/upload/v1649317047/InstaGama/kisspng-user-profile-get-em-cardiovascular-disease-zingah-avatar-5ab7520468bc16.870439461521963524429_iy5c3i.jpg',
    });
    setLoadingQuitar(false);
  };

  return (
    <Modal closeModal={handleCloseModal}>
      <div className="flex flex-col">
        <div className="w-[60px] aspect-square mx-auto my-2">
          <HeroImage url={data ? data[0] : foto} className="w-[60px]" />
        </div>
        <h2 className="text-center font-semibold font-sans">Foto del perfil</h2>
        <span className="text-center py-2 font-thin font-sans text-grisLetra text-xs">
          InstaGama
        </span>
        <button
          onClick={handleOpenCloudinary}
          disabled={loading || loadingQuitar}
          className="py-4 text-sm font-sans border-y border-bordes text-azul font-semibold"
        >
          Cambiar foto
        </button>
        <button
          disabled={loadingQuitar || loading}
          onClick={handleQuitarFoto}
          className="py-4 text-sm font-sans border-b border-bordes text-red-500 font-semibold "
        >
          Quitar foto
        </button>
        <button className="py-4 text-sm font-sans " onClick={handleCloseModal}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

ModalChangePhoto.propTypes = {
  handleCloseModal: propTypes.func.isRequired,
};

export default ModalChangePhoto;
