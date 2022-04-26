import propTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroImage from '../../../components/HeroImage';
import Spinner from '../../../components/Spinner';
import { useAuthContext } from '../../../hooks/useAuthContext';
import useUser from '../../../hooks/useUser';
import useProfile from '../hook/useProfile';
import { getFollowersOrFollowing } from '../../../services/getFollowersOrFollowing';
import { toogleFollow } from '../../../services/toogleFollow';

const ModalFollowingOrFollowers = ({ typeData, handleCloseModal }) => {
  const [arrData, setarrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const isMounted = useRef(true);
  const {
    state: { id },
  } = useProfile();
  const { following, id: userSesion } = useUser();
  const { handleFollowUserSesion } = useAuthContext();
  useEffect(() => {
    isMounted.current = true;

    setLoading(true);
    async function data() {
      const res = await getFollowersOrFollowing(typeData, id);
      setarrData(res[typeData === 'seguidores' ? 'followers' : 'following']);
    }
    data().then(() => {
      if (isMounted.current) {
        setLoading(false);
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleFollow = async (id) => {
    setLoadingFollow(true);
    await toogleFollow(id);
    handleFollowUserSesion(id);
    if (isMounted.current) {
      setLoadingFollow(false);
    }
  };
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="w-full text-center px-4 pt-2 font-bold">{typeData}</h2>
      {loading ? (
        <Spinner />
      ) : (
        arrData?.map((el) => (
          <div
            className="p-4 flex text-sm font-sans items-center justify-between"
            key={el.id}
          >
            <div className="center gap-2 min-w-0">
              <HeroImage url={el.foto} />
              <button
                onClick={() => {
                  handleCloseModal();
                  navigate(`/${el.userName}`);
                }}
                className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden"
              >
                {el.name}
              </button>
            </div>
            {el.id !== userSesion && (
              <button
                onClick={() => handleFollow(el.id)}
                disabled={loadingFollow}
                className="p-2 disabled:bg-azul disabled:bg-opacity-40 bg-azul rounded-lg text-white"
              >
                {loadingFollow ? (
                  <Spinner />
                ) : following.includes(el.id) ? (
                  'Siguiendo'
                ) : (
                  'Seguir'
                )}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

ModalFollowingOrFollowers.propTypes = {
  typeData: propTypes.string.isRequired,
  handleCloseModal: propTypes.func.isRequired,
};

export default ModalFollowingOrFollowers;
