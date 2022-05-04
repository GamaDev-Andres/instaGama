import propTypes from 'prop-types';
import usePageComentsContext from '../hook/usePageComentContext';
import ComentWithPhotoAndDate from './ComentWithPhotoAndDate';

const ListoOfComents = ({ coments }) => {
  const { autor, descripcion, fecha } = usePageComentsContext();

  return (
    <div className="flex flex-col bg-fondoClaro flex-grow p-4 ">
      <ComentWithPhotoAndDate
        autor={autor}
        descripcion={descripcion}
        fecha={fecha}
      />
      {coments.map((coment) => (
        <ComentWithPhotoAndDate
          key={coment.id}
          autor={coment.autor}
          descripcion={coment.text}
          fecha={coment.createdAt}
        />
      ))}
    </div>
  );
};
ListoOfComents.propTypes = {
  coments: propTypes.array.isRequired,
};
export default ListoOfComents;
