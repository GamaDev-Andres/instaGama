import propTypes from 'prop-types';
import { dateToMs } from '../../../adapters/dateToMs';
import HeroImage from '../../../components/HeroImage';
import Coment from '../../../components/Post/Coment';
import { timeAgo } from '../../../utilities/timeAgo';

const ComentWithPhotoAndDate = ({ autor, descripcion, fecha }) => {
  return (
    <div className="flex items-center justify-start gap-4 border-b border-bordes py-2">
      <div className="min-w-[32px] self-start">
        <HeroImage url={autor.foto} className="w-[32px]" />
      </div>
      <div className="flex flex-col">
        <Coment
          texto={descripcion}
          name={autor.name}
          username={autor.userName}
        />
        <span className="text-grisLetra text-xs block py-2">
          {timeAgo(dateToMs(fecha), 'es-ES')}
        </span>
      </div>
    </div>
  );
};
ComentWithPhotoAndDate.propTypes = {
  fecha: propTypes.string.isRequired,
  autor: propTypes.object.isRequired,
  descripcion: propTypes.string.isRequired,
};
export default ComentWithPhotoAndDate;
