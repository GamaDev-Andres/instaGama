import HeroImage from '../../../components/HeroImage';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';

const HeaderProfile = ({ foto, name }) => {
  const { user: nameUser } = useParams();

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
          <button className="w-full max-w-[250px] font-semibold font-sans border text-sm border-bordes py-[5px] px-[9px] rounded-md">
            Editar perfil
          </button>
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
