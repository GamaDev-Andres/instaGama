import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Coment from './Coment';
import usePost from './hook/usePost';

const DescriptionPost = ({ likes, descripcion = '' }) => {
  const {
    _id,
    coments,
    autor: { userName, name },
  } = usePost();

  return (
    <div className="text-sm pb-2 px-4">
      <div className="font-semibold">
        <span>{likes.length}</span>
        {likes && ` Me gusta${likes > 1 ? 's' : ''}`}
      </div>
      <div>
        {descripcion.length > 0 && (
          <span>
            <Link to={`/${userName}`} className="font-semibold">
              {name}
            </Link>{' '}
            {descripcion.length > 150 ? descripcion.slice(0, 150) : descripcion}
          </span>
        )}
        {descripcion.length > 150 && (
          <span>
            ...&nbsp;<button className="text-grisLetra">más</button>
          </span>
        )}
        <div>
          {coments.slice(-2).map((coment) => (
            <Coment
              key={coment._id}
              texto={coment.text}
              name={coment.autor?.name}
              username={coment.autor?.userName}
            />
          ))}
        </div>
        <div>
          {coments.length > 2 && (
            <Link
              to={`/coments/${_id}`}
              className="text-grisLetra font-semibold"
            >
              ver los {coments.length} comentarios
            </Link>
          )}
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
