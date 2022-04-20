import PropTypes from 'prop-types';
import { useReducer, useCallback, useMemo } from 'react';
import { historiesToObject } from '../../adapters/historiesToObject';

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
      console.log(response);
      if (response?.msg || response?.errors) {
        return response?.msg || response?.errors[0]?.msg;
      }
      localStorage.setItem('token', response.token);
      const histories = await getHistoriesUser(response.usuario.id);
      response.usuario.histories = historiesToObject(
        response.usuario,
        histories
      );
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
      const histories = await getHistoriesUser(response.usuario.id);
      response.usuario.histories = historiesToObject(
        response.usuario,
        histories
      );
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
        return response?.msg || response?.errors[0]?.msg;
      }
      const histories = await getHistoriesUser(response.usuario.id);
      response.usuario.histories = historiesToObject(
        response.usuario,
        histories
      );
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

  const createPost = useCallback(async (data) => {
    const urlPeticion = url + '/api/post/create';
    try {
      const response = await customFetch(urlPeticion, 'POST', data);
      if (response?.msg || response?.errors) {
        return response?.msg || response?.errors[0]?.msg;
      }
      return response?.post;
    } catch (error) {
      console.log(error);
    }
  });
  const toogleLikePost = useCallback(async (idPost) => {
    const urlPeticion = url + '/api/like';
    try {
      const response = await customFetch(urlPeticion, 'POST', { idPost });
      if (response?.msg || response?.errors) {
        return response?.msg || response?.errors[0]?.msg;
      }
      console.log(response);
      //  return response?.post;
    } catch (error) {
      console.log(error);
    }
  });

  const getHistoriesOfFollowing = useCallback(async () => {
    const historiesOfFollowing = await Promise.all(
      state?.user?.following.map((el) => getHistoriesUser(el))
    );
    return historiesOfFollowing;
  }, [state]);

  const getOneUser = useCallback(async (userName) => {
    const urlPeticion = url + '/api/users/' + userName;
    const user = await customFetch(urlPeticion, 'GET');
    return user;
  });

  const contexValue = useMemo(
    () => ({
      state,
      handleLogin,
      createPost,
      toogleLikePost,
      handleRegister,
      renovarToken,
      getHistoriesOfFollowing,
      logOut,
      getOneUser,
    }),
    [
      state,
      handleLogin,
      createPost,
      toogleLikePost,
      handleRegister,
      renovarToken,
      logOut,
      getOneUser,
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
