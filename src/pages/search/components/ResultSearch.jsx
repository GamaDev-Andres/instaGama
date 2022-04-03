import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeroImage from '../../../components/HeroImage';

const ResultSearch = ({ user, mode = 'search' }) => {
  return (
    <div className="center px-4 py-2">
      <Link className="center gap-2 px-4 py-2 w-full min-w-0" to={`/${user}/`}>
        <HeroImage size={44} />
        <div className="flex flex-col min-w-0 w-full text-sm font-sans overflow-hidden">
          <h3 className="font-semibold">{user}</h3>
          <span className="text-grisLetra whitespace-nowrap text-ellipsis overflow-hidden block min-w-0">
            descripcion de andre.gama Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Ad molestiae ullam corporis omnis laboriosam,
            consequuntur aliquam autem nulla
          </span>
        </div>
      </Link>
      {mode === 'recent' && (
        <button className=" text-grisLetra center px-4 ">
          <i className="fa-solid fa-x"></i>
        </button>
      )}
    </div>
  );
};

ResultSearch.propTypes = {
  user: PropTypes.string.isRequired,
  mode: PropTypes.string,
};

export default ResultSearch;
