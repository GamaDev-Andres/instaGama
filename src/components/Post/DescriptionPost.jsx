import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Coment from './Coment';

const DescriptionPost = ({ likes, descripcion = '' }) => {
  const comentarios = 13;
  const coments = [1, 2, 3, 4];

  return (
    <div className="text-sm pb-2 px-4">
      <div className="font-semibold">
        <span>{likes.length}</span>
        {likes && ` Me gusta${likes > 1 ? 's' : ''}`}
      </div>
      <div>
        <span>
          <Link to="/profile" className="font-semibold">
            andres gama
          </Link>{' '}
          {descripcion.length > 150 ? descripcion.slice(0, 150) : descripcion}
        </span>
        {descripcion.length > 150 && (
          <span>
            ...&nbsp;<button className="text-grisLetra">más</button>
          </span>
        )}
        <div>
          {coments.slice(0, 2).map((el) => (
            <Coment
              key={el}
              texto="Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus commodi hic,"
            />
          ))}
        </div>
        <div>
          <Link to="/coments" className="text-grisLetra font-semibold">
            ver los {comentarios} comentarios
          </Link>
        </div>
      </div>
    </div>
  );
};
DescriptionPost.propTypes = {
  descripcion: propTypes.string,
  likes: propTypes.array.isRequired,
};
export default DescriptionPost;
