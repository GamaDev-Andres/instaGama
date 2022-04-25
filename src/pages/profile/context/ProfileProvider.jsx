import { useReducer, useCallback, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect, useRef } from 'react/cjs/react.development';
import Spinner from '../../../components/Spinner';
import { customFetch } from '../../../services/customFetch';

import Profile from '../Profile';
import { profileTypes } from '../types/profileTypes';
import profileContext from './profileContext';
import profileReducer from './profileReducer';

const initialState = {
  id: null,
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

  const toogleLikePost = useCallback((post) => {
    dispatch({ type: profileTypes.SET_POST, payload: post });
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
    dispatch({ type: profileTypes.DELETE_POST, payload: idPost });
  });

  const updatePost = useCallback((idPost, data) => {
    dispatch({
      type: profileTypes.UPDATE_POST,
      payload: { id: idPost, descripcion: data },
    });
  });

  const toogleFollow = useCallback(
    async (uid) => {
      try {
        const urlPath = url + '/api/users/follow/' + state.id;
        const response = await customFetch(urlPath, 'POST');
        if (response?.msg || response?.errors) {
          throw new Error(response?.msg || response?.errors[0]?.msg);
        }
        dispatch({ type: profileTypes.TOOGLE_FOLLOW, payload: uid });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    [state.id]
  );

  const contexValue = useMemo(
    () => ({
      state,
      toogleLikePost,
      deletePostState,
      updatePost,
      getHistoriesOfFollowing,
      getOneUser,
      toogleFollow,
    }),
    [
      state,
      toogleLikePost,
      deletePostState,
      updatePost,
      getOneUser,
      toogleFollow,
    ]
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
