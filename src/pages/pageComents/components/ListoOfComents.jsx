import propTypes from 'prop-types';
import usePageComentsContext from '../hook/usePageComentContext';
import ComentWithPhotoAndDate from './ComentWithPhotoAndDate';

const ListoOfComents = ({ coments }) => {
  const { autor, descripcion, fecha } = usePageComentsContext();

  return (
    <div className="flex flex-col bg-fondoClaro flex-grow px-4 pb-4">
      <ComentWithPhotoAndDate
        coment={{ autor, text: descripcion, createdAt: fecha, id: null }}
      />
      {coments.map((coment) => (
        <ComentWithPhotoAndDate key={coment.id} coment={coment} />
      ))}
    </div>
  );
};
ListoOfComents.propTypes = {
  coments: propTypes.array.isRequired,
};
export default ListoOfComents;
