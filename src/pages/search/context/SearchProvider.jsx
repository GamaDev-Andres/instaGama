import propTypes from 'prop-types';
import { useReducer } from 'react';
import useInput from '../../../hooks/useInput';
import { searchTypes } from '../../../types/searchTypes';
import searchContext from './searchContext';
import searchReducer from './searchReducer';
const initialState = {
  busqueda: '',
};
const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { reset, handleChange, input } = useInput();

  const handleBusqueda = (value) => {
    dispatch({ type: searchTypes.searchChangeBusqueda, payload: value });
  };
  return (
    <searchContext.Provider
      value={{ reset, handleChange, input, handleBusqueda, state }}
    >
      {children}
    </searchContext.Provider>
  );
};
SearchProvider.propTypes = {
  children: propTypes.element.isRequired,
};
export default SearchProvider;
