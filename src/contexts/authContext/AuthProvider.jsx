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
      if (response?.msg || response?.errors) {
        return response?.msg || response?.errors[0]?.msg;
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

  const handleRegister = async ({ email, password, name }) => {
    const urlPeticion = url + '/api/users/create';
    const response = await customFetch(
      urlPeticion,
      'POST',
      { email, password, name },
      false
    );
    console.log(response);
    if (response?.msg || response?.errors) {
      return response?.msg || response?.errors[0]?.msg;
    }
    localStorage.setItem('token', response.token);
    dispatch({
      type: authTypes.SET_USER,
      payload: { ...response.usuario, token: response.token },
    });
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
  const logOut = () => {
    if (state.user) {
      localStorage.removeItem('token');
      dispatch({ type: authTypes.LOG_OUT });
    }
  };
  return (
    <authContext.Provider
      value={{ state, handleLogin, handleRegister, renovarToken, logOut }}
    >
      {children}
    </authContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.any,
};
export default AuthProvider;
