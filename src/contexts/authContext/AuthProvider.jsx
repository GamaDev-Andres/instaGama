import PropTypes from 'prop-types';
import { useReducer, useCallback, useMemo } from 'react';
// import { historiesToObject } from '../../adapters/historiesToObject';

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

  const handleLogin = useCallback(async ({ email, password }) => {
    try {
      const urlPeticion = url + '/api/auth/login';
      const response = await customFetch(
        urlPeticion,
        'POST',
        { email, password },
        false
      );
      if (response?.msg || response?.errors) {
        return response?.msg || response?.errors[0]?.msg;
      }
      localStorage.setItem('token', response.token);
      // const histories = await getHistoriesUser(response.usuario.id);
      // response.usuario.histories = historiesToObject(
      //   response.usuario,
      //   histories
      // );
      dispatch({
        type: authTypes.SET_USER,
        payload: { ...response.usuario, token: response.token },
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRegister = useCallback(
    async ({ email, password, name, userName }) => {
      const urlPeticion = url + '/api/users/create';
      const response = await customFetch(
        urlPeticion,
        'POST',
        { email, password, name, userName },
        false
      );
      if (response?.msg || response?.errors) {
        return response?.msg || response?.errors[0]?.msg;
      }
      localStorage.setItem('token', response.token);
      // const histories = await getHistoriesUser(response.usuario.id);
      // response.usuario.histories = historiesToObject(
      //   response.usuario,
      //   histories
      // );
      dispatch({
        type: authTypes.SET_USER,
        payload: { ...response.usuario, token: response.token },
      });
    },
    []
  );

  const renovarToken = useCallback(async () => {
    try {
      const urlPeticion = url + '/api/auth';
      const response = await customFetch(urlPeticion, 'GET');
      if (response?.msg || response?.errors) {
        localStorage.removeItem('token');
        return response?.msg || response?.errors[0]?.msg;
      }
      // const histories = await getHistoriesUser(response.usuario.id);
      // response.usuario.histories = historiesToObject(
      //   response.usuario,
      //   histories
      // );
      dispatch({
        type: authTypes.SET_USER,
        payload: { ...response.usuario, token: response.token },
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logOut = useCallback(() => {
    if (state.user) {
      localStorage.removeItem('token');
      dispatch({ type: authTypes.LOG_OUT });
    }
  }, [state.user]);

  const getHistoriesUser = async (uid) => {
    const urlPeticion = url + '/api/history/' + uid;
    try {
      const response = await customFetch(urlPeticion, 'GET');
      if (response?.msg || response?.errors) {
        return response?.msg || response?.errors[0]?.msg;
      }
      return response?.historias;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowUserSesion = useCallback((uid) => {
    dispatch({ type: authTypes.TOOGLE_FOLLOW, payload: uid });
  });

  const contexValue = useMemo(
    () => ({
      state,
      handleLogin,
      handleRegister,
      renovarToken,
      logOut,
      handleFollowUserSesion,
      getHistoriesUser,
    }),
    [
      state,
      handleLogin,
      handleRegister,
      renovarToken,
      logOut,
      handleFollowUserSesion,
      getHistoriesUser,
    ]
  );

  return (
    <authContext.Provider value={contexValue}>{children}</authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthProvider;
