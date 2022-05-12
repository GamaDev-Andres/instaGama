import { useContext } from 'react';

import searchContext from '../context/searchContext';
import ResultSearch from './ResultSearch';

const Recents = () => {
  const { deleteAllReceantsSearches, searchesRecents } =
    useContext(searchContext);

  return (
    <div className="flex flex-col max-w-[935px] mx-auto mt-1 md:mt-7">
      <div className="font-semibold font-sans flex justify-between px-4 py-2">
        <h4>
          {searchesRecents.length > 0
            ? 'Recientes'
            : 'No tienes busquedas recientes'}
        </h4>
        {searchesRecents.length > 0 && (
          <button
            onClick={deleteAllReceantsSearches}
            className="font-semibold text-azul"
          >
            Borrar todo
          </button>
        )}
      </div>
      {searchesRecents.map((search) => (
        <ResultSearch key={search.id} mode="recent" {...search} />
      ))}
    </div>
  );
};

export default Recents;
