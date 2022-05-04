import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Coment = ({ texto, name, username }) => {
  return (
    <div className="font-sans text-sm">
      <div className="break-all">
        <Link to={`/${username}`} className="font-semibold mr-2">
          {name}
        </Link>{' '}
        {texto}
      </div>
    </div>
  );
};
Coment.propTypes = {
  texto: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
};
export default Coment;
