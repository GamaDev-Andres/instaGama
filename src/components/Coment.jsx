import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Coment = ({ texto }) => {
  return (
    <div>
      <Link to="/profile" className="font-semibold">
        soy autor
      </Link>{' '}
      {texto}
    </div>
  );
};
Coment.propTypes = {
  texto: propTypes.string.isRequired,
};
export default Coment;
