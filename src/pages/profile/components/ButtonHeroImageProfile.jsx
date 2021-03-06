import propTypes from 'prop-types';
import { useState } from 'react';

import HeroImage from '../../../components/HeroImage';
import ModalChangePhoto from './ModalChangePhoto';

const ButtonHeroImageProfile = ({ foto }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <button onClick={handleOpenModal}>
        <HeroImage url={foto} className="w-[77px] md:w-[150px]" />
      </button>
      {isOpenModal && <ModalChangePhoto handleCloseModal={handleCloseModal} />}
    </>
  );
};
ButtonHeroImageProfile.propTypes = {
  foto: propTypes.string.isRequired,
};
export default ButtonHeroImageProfile;
