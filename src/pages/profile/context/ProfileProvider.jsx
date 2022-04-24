import { useReducer, useCallback, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect, useRef } from 'react/cjs/react.development';
import Spinner from '../../../components/Spinner';
import { customFetch } from '../../../services/customFetch';
import { authTypes } from '../../../types/authTypes';

import Profile from '../Profile';
import { profileTypes } from '../types/profileTypes';
import profileContext from './profileContext';
import profileReducer from './profileReducer';

const initialState = {
  name: null,
  userName: null,
  foto: null,
  posts: null,
  following: null,
  followers: null,
};
const ProfileProvider = () => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const url = import.meta.env.VITE_URL_SERVER;
  const { user: userName } = useParams();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    getOneUser(userName).then((res) => {
      if (!res?.usuario) {
        navigate('/');
        return;
      }
      if (isMounted.current) {
        dispatch({ type: profileTypes.SET_USER, payload: res.usuario });
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

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
      if (response.post) {
        dispatch({ type: authTypes.SET_POST, payload: response.post });
      }
    } catch (error) {
      console.log(error);
    }
  });

  const getHistoriesOfFollowing = useCallback(async () => {
    try {
      const historiesOfFollowing = await Promise.all(
        state?.user?.following.map((el) => getHistoriesUser(el))
      );
      return historiesOfFollowing;
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  const getOneUser = useCallback(async (userName) => {
    const urlPeticion = url + '/api/users/' + userName;
    try {
      const response = await customFetch(urlPeticion, 'GET');
      if (response?.msg || response?.errors) {
        throw new Error(response?.msg || response?.errors[0].msg);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  });
  const deletePostState = useCallback((idPost) => {
    dispatch({ type: authTypes.DELETE_POST, payload: idPost });
  });

  const updatePost = useCallback((idPost, data) => {
    dispatch({
      type: profileTypes.UPDATE_POST,
      payload: { id: idPost, descripcion: data },
    });
  });

  const contexValue = useMemo(
    () => ({
      state,
      createPost,
      toogleLikePost,
      deletePostState,
      updatePost,
      getHistoriesOfFollowing,
      getOneUser,
    }),
    [state, createPost, toogleLikePost, deletePostState, updatePost, getOneUser]
  );
  if (!state?.posts) {
    return <Spinner fullScreen={true} />;
  }
  return (
    <profileContext.Provider value={contexValue}>
      <Profile>
        <Suspense fallback={<Spinner />}>
          <Outlet context={{ posts: state?.posts }} />
        </Suspense>
      </Profile>
    </profileContext.Provider>
  );
};

export default ProfileProvider;
