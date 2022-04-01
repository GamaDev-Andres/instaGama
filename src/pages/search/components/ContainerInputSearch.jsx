import { useLocation, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { toArrPath } from '../../../utilities/toArrPath';

const ContainerInputSearch = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { reset, handleChange, input: inputSearch } = useInput();

  const arrPathname = toArrPath(pathname);
  const isSearching = arrPathname[2];

  const handleRedirectSearching = () => {
    navigate('searching');
  };
  const handleRedirectSearch = () => {
    reset();
    navigate('/search');
  };
  return (
    <div className="flex w-full px-4 gap-4">
      <div
        onClick={handleRedirectSearching}
        className="rounded flex-grow w-full relative"
      >
        <input
          onChange={handleChange}
          value={inputSearch}
          className="px-6 border focus:border focus:border-gray-400 appearance-none py-1 rounded w-full text-negro text-sm outline-none"
          type="search"
          placeholder={isSearching ? 'Busca' : ''}
        />
        <div
          className={`absolute center gap-2 text-grisLetra text-sm transition-all duration-300 ${
            isSearching
              ? 'left-0 translate-x-0 -translate-y-1/2 top-1/2'
              : '-translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2'
          }`}
        >
          <span className="block pl-[7px] text-xs">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          {!isSearching && <span>Busca</span>}
        </div>
        {inputSearch !== '' && (
          <button
            onClick={reset}
            className="absolute top-1/2 -translate-y-1/2 right-0 px-2"
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        )}
      </div>
      {isSearching && (
        <button
          className="font-semibold font-sans text-sm"
          onClick={handleRedirectSearch}
        >
          Cancelar
        </button>
      )}
    </div>
  );
};

export default ContainerInputSearch;
