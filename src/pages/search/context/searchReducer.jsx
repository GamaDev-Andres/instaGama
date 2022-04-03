import { searchTypes } from '../../../types/searchTypes';

const searchReducer = (state, action) => {
  switch (action.type) {
    case searchTypes.searchChangeBusqueda:
      return { busqueda: action.payload };
    default:
      return state;
  }
};
export default searchReducer;
