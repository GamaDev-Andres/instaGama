import PropTypes from 'prop-types';
import { useReducer } from 'react';
import { customFetch } from '../../services/customFetch';
import { authTypes } from '../../types/authTypes';
import authContext from './authContext';
import authReducer from './authReducer';
const initialState = {
  user: null,
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const url = import.meta.env.VITE_URL_SERVER;
  const handleLogin = async ({ email, password }) => {
    try {
      const urlPeticion = url + '/api/auth/login';
      const response = await customFetch(
        urlPeticion,
        'POST',
        { email, password },
        false
      );
      console.log(response);
      if (response?.msg) {
        console.log(response.msg);
        return;
      }
      localStorage.setItem('token', response.token);
      dispatch({
        type: authTypes.SET_USER,
        payload: { ...response.usuario, token: response.token },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renovarToken = async () => {
    try {
      const urlPeticion = url + '/api/auth';
      const response = await customFetch(urlPeticion, 'GET');
      if (response.msg) {
        console.log(response.msg);
        return;
      }
      dispatch({
        type: authTypes.SET_USER,
        payload: { ...response.usuario, token: response.token },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <authContext.Provider value={{ state, handleLogin, renovarToken }}>
      {children}
    </authContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.any,
};
export default AuthProvider;
