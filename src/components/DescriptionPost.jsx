import { Link } from 'react-router-dom';
import Coment from './Coment';

const DescriptionPost = () => {
  const likes = 15;
  const comentarios = 13;
  const coments = [1, 2, 3, 4];
  const texto = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus commodi hic, possimus dicta laborum sit magni deserunt
          laudantium est consequatur dolore nisi quisquam mollitia quos culpa
          sequi consequuntur id ut`;
  return (
    <div className="text-sm pb-2 px-4">
      <div className="font-semibold">
        <span>{likes}</span>
        {likes && ` Me gusta${likes > 1 ? 's' : ''}`}
      </div>
      <div>
        <span>
          <Link to="/profile" className="font-semibold">
            andres gama
          </Link>{' '}
          {texto.length > 150 ? texto.slice(0, 150) : texto}
        </span>
        {texto.length > 150 && (
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

export default DescriptionPost;
