import propTypes from 'prop-types';
import HeroImage from '../../../components/HeroImage';
import { useAuthContext } from '../../../hooks/useAuthContext';

const History = ({ data }) => {
  const {
    state: {
      user: { id },
    },
  } = useAuthContext();
  return (
    <div className="px-1">
      <div className="cursor-pointer center relative">
        <div className="gradiante-historias center aspect-square p-[2px] rounded-full">
          <HeroImage url={data?.autor?.foto} className="w-[60px]" />
        </div>
        {id === data.autor._id && (
          <div className="absolute bottom-0 right-0 aspect-square bg-fondoClaro rounded-full center">
            <i className="fa-solid fa-circle-plus text-azul aspect-square w-6 h-6 center text-2xl"></i>
          </div>
        )}
      </div>
      <div className="text-center mt-1 text-xs whitespace-nowrap text-ellipsis overflow-hidden max-w-[78px]">
        {data?.autor?.name}
      </div>
    </div>
  );
};

History.propTypes = {
  data: propTypes.object.isRequired,
};

export default History;
