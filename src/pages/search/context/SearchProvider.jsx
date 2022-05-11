import propTypes from 'prop-types';
import { useMemo, useRef, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';

import searchContext from './searchContext';
import { searchUsers } from '../../../services/searchUsers';

const SearchProvider = ({ children }) => {
  const [autoCompleteState, setAutoCompleteState] = useState({
    collections: [],
    isOpen: false,
  });
  const [searchesRecents, setSearchesRecents] = useState(
    () => JSON.parse(localStorage.getItem('recents')) || []
  );
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  const autoComplete = useMemo(
    () =>
      createAutocomplete({
        onStateChange: ({ state }) => setAutoCompleteState(state),
        getSources: () => [
          {
            sourceId: 'users-name',
            getItems: ({ query }) => (query ? searchUsers(query) : null),
          },
        ],
      }),
    []
  );

  const addReceantSearch = (search) => {
    localStorage.setItem(
      'recents',
      JSON.stringify([...searchesRecents, search])
    );
    setSearchesRecents([...searchesRecents, search]);
  };

  const deleteAllReceantsSearches = () => {
    localStorage.removeItem('recents');
    setSearchesRecents([]);
  };
  const deleteOneSearch = (id) => {
    localStorage.setItem(
      'recents',
      JSON.stringify(searchesRecents.filter((search) => search.id !== id))
    );
    setSearchesRecents(searchesRecents.filter((search) => search.id !== id));
  };

  return (
    <searchContext.Provider
      value={{
        autoComplete,
        panelRef,
        autoCompleteState,
        inputRef,
        searchesRecents,
        addReceantSearch,
        deleteAllReceantsSearches,
        deleteOneSearch,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};
SearchProvider.propTypes = {
  children: propTypes.element.isRequired,
};
export default SearchProvider;
