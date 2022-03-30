import PropTypes from 'prop-types';
import { useReducer } from 'react';
import { authTypes } from '../../types/authTypes';
import authContext from './authContext';
import authReducer from './authReducer';
const initialState = {
  token: true,
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const changeToken = () => {
    dispatch({ type: authTypes.TOOGLE_TOKEN, payload: !state.token });
  };
  return (
    <authContext.Provider value={{ changeToken, state }}>
      {children}
    </authContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.any,
};
export default AuthProvider;
