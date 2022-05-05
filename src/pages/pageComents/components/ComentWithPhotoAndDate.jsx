import propTypes from 'prop-types';
import { dateToMs } from '../../../adapters/dateToMs';
import HeroImage from '../../../components/HeroImage';
import Coment from '../../../components/Post/Coment';
import useUser from '../../../hooks/useUser';
import { timeAgo } from '../../../utilities/timeAgo';
import ButtonOptionsComent from './ButtonOptionsComent';

const ComentWithPhotoAndDate = ({ coment }) => {
  const { id } = useUser();
  const { autor, text, createdAt: fecha, id: idComent } = coment;
  return (
    <div className="flex items-center justify-start gap-4 border-b border-bordes pt-4 pb-2">
      <div className="min-w-[32px] self-start">
        <HeroImage url={autor.foto} className="w-[32px]" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <Coment texto={text} name={autor.name} username={autor.userName} />
          {id === autor._id && (
            <div className="flex self-start">
              <ButtonOptionsComent text={text} idComent={idComent} />
            </div>
          )}
        </div>
        <span className="text-grisLetra text-xs block py-2">
          {timeAgo(dateToMs(fecha), 'es-ES')}
        </span>
      </div>
    </div>
  );
};
ComentWithPhotoAndDate.propTypes = {
  coment: propTypes.object.isRequired,
};
export default ComentWithPhotoAndDate;
