import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import HeroImage from '../../../components/HeroImage';
import searchContext from '../context/searchContext';

const ResultSearch = ({ userName, foto, name, id, mode = 'search' }) => {
  const navigate = useNavigate();
  const { addReceantSearch, deleteOneSearch } = useContext(searchContext);
  const handleRedirect = () => {
    addReceantSearch({ userName, foto, name, id });
    navigate(`/${userName}`);
  };

  return (
    <div className="center px-4 py-2">
      <button
        className="center gap-2 px-4 py-2 w-full min-w-0"
        onClick={handleRedirect}
      >
        <HeroImage url={foto} className="w-[44px]" />
        <div className="flex flex-col min-w-0 w-full text-sm font-sans overflow-hidden">
          <h3 className="font-semibold text-left">{userName}</h3>
          <span className="text-grisLetra text-left whitespace-nowrap text-ellipsis overflow-hidden block min-w-0">
            {name}
          </span>
        </div>
      </button>
      {mode === 'recent' && (
        <button
          onClick={() => deleteOneSearch(id)}
          className=" text-grisLetra center px-4 "
        >
          <i className="fa-solid fa-x"></i>
        </button>
      )}
    </div>
  );
};

ResultSearch.propTypes = {
  userName: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  foto: PropTypes.string,
  mode: PropTypes.string,
};

export default ResultSearch;
