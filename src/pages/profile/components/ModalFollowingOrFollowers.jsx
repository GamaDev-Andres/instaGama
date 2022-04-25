import propTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroImage from '../../../components/HeroImage';
import Spinner from '../../../components/Spinner';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { usePostMethods } from '../../../hooks/usePostMethods';
import useUser from '../../../hooks/useUser';
import { getFollowersOrFollowing } from '../../../services/getFollowersOrFollowing';
import { toogleFollow } from '../../../services/toogleFollow';
import useProfile from '../hook/useProfile';

const ModalFollowingOrFollowers = ({ typeData }) => {
  const [arrData, setarrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);
  const {
    state: { id },
  } = useProfile();
  const { following, id: userSesion } = useUser();
  usePostMethods();
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
    await toogleFollow(id);
    handleFollowUserSesion(id);
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
            <div className="center gap-2">
              <HeroImage url={el.foto} />
              <button
                onClick={() => navigate(`/${el.userName}`)}
                className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden"
              >
                {el.name}
              </button>
            </div>
            {el.id !== userSesion && (
              <button
                onClick={() => handleFollow(el.id)}
                disabled={loading}
                className="p-2 bg-azul rounded-lg text-white"
              >
                {following.includes(el.id) ? 'Siguiendo' : 'Seguir'}
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
};

export default ModalFollowingOrFollowers;
