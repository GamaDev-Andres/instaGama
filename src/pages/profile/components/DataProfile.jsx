import propTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';
import Modal from '../../../components/Modal';
import ModalFollowingOrFollowers from './ModalFollowingOrFollowers';

const DataProfile = ({ posts, followers, following }) => {
  const [typeModal, setTypeModal] = useState(null);
  const data = [
    { type: 'publicaciones', number: posts?.length },
    { type: 'seguidores', number: followers?.length },
    { type: 'seguidos', number: following?.length },
  ];

  const handleModal = (type) => {
    if (type !== 'publicaciones') {
      setTypeModal(type);
    }
  };

  return (
    <div className="center py-3">
      {data.map((el) => (
        <div
          onClick={() => handleModal(el.number > 0 && el.type)}
          className={`${
            el.type === 'publicaciones' ? '' : 'cursor-pointer'
          } center-col text-sm flex-grow text-grisLetra`}
          key={el.type}
        >
          <span className="font-semibold text-negro">{el.number}</span>
          {el.type}
        </div>
      ))}
      {typeModal && (
        <Modal closeModal={() => setTypeModal(null)}>
          <ModalFollowingOrFollowers typeData={typeModal} />
        </Modal>
      )}
    </div>
  );
};
DataProfile.propTypes = {
  posts: propTypes.array.isRequired,
  followers: propTypes.array.isRequired,
  following: propTypes.array.isRequired,
};
export default DataProfile;
