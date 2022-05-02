import HeroImage from '../../../components/HeroImage';
import { Link, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import useUser from '../../../hooks/useUser';
import useProfile from '../hook/useProfile';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useState } from 'react/cjs/react.development';

const HeaderProfile = ({ foto, name }) => {
  const { user: nameUser } = useParams();
  const { userName, following, id } = useUser();
  const { handleFollowUserSesion } = useAuthContext();
  const [loadingFollow, setLoadingFollow] = useState(false);
  const {
    state: { id: idProfile },
    toogleFollow,
  } = useProfile();

  const handleFollow = async () => {
    setLoadingFollow(true);
    await toogleFollow(id);
    handleFollowUserSesion(idProfile);
    setLoadingFollow(false);
  };
  return (
    <header className="py-2 px-4 flex flex-col gap-8 border-b border-bordes">
      <div className="flex justify-start gap-4">
        <button>
          <HeroImage url={foto} className="w-[77px]" />
        </button>
        <div className="flex flex-col justify-center items-start flex-grow mr-4 w-full min-w-0">
          <h2 className="w-full max-w-full text-[28px] font-thin font-sans block overflow-hidden text-ellipsis whitespace-nowrap">
            {nameUser}
          </h2>

          {userName === nameUser ? (
            <button className="w-full max-w-[250px] font-semibold font-sans border text-sm border-bordes py-[5px] px-[9px] rounded-md">
              Editar perfil
            </button>
          ) : (
            <div className="flex gap-1 w-full max-w-[250px] justify-start">
              <Link
                to={`/inbox/${idProfile}`}
                className="whitespace-nowrap font-semibold font-sans border text-sm border-bordes py-[5px] px-[9px] rounded-md"
              >
                enviar Mensaje
              </Link>
              <button
                disabled={loadingFollow}
                onClick={handleFollow}
                className="font-semibold font-sans border text-sm border-bordes py-[5px] px-[9px] rounded-md"
              >
                {following.includes(idProfile) ? (
                  <i className="fa-solid fa-user-check"></i>
                ) : (
                  <i className="fa-solid fa-user-plus"></i>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="pb-2">
        <span className="font-semibold font-sans block overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </span>
      </div>
    </header>
  );
};
HeaderProfile.propTypes = {
  foto: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};
export default HeaderProfile;
