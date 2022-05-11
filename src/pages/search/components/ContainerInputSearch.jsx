import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useContext } from 'react';

import { toArrPath } from '../../../utilities/toArrPath';
import searchContext from '../context/searchContext';

const ContainerInputSearch = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { autoComplete, inputRef } = useContext(searchContext);
  const arrPathname = toArrPath(pathname);
  const isSearching = arrPathname[2];

  const handleRedirectSearching = () => {
    navigate('searching');
  };
  const handleRedirectSearch = () => {
    navigate('/search');
  };
  const formProps = autoComplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autoComplete.getInputProps({
    inputElement: inputRef.current,
  });
  return (
    <div className="flex w-full px-4 gap-4">
      <div
        onClick={handleRedirectSearching}
        className="rounded flex-grow w-full relative"
      >
        <form {...formProps} ref={formRef}>
          <input
            ref={inputRef}
            {...inputProps}
            className="px-6 border focus:border focus:border-gray-400 appearance-none py-1 rounded w-full text-negro text-sm outline-none"
            type="search"
            placeholder={isSearching ? 'Busca' : ''}
          />
        </form>

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
