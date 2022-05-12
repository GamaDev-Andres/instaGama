import {
  useReducer,
  useCallback,
  useMemo,
  Suspense,
  useEffect,
  useRef,
} from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

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
  const { user: userName } = useParams();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const url = import.meta.env.VITE_URL_SERVER;

  useEffect(() => {
    isMounted.current = true;

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
  }, [userName]);

  const toogleLikePost = useCallback((post) => {
    dispatch({ type: profileTypes.SET_POST, payload: post });
  });
  const updateUserState = (data) => {
    dispatch({ type: profileTypes.UPDATE_USER, payload: data });
  };
  const updateUser = useCallback(async (data) => {
    const urlPeticion = url + '/api/users';

    try {
      const response = await customFetch(urlPeticion, 'PUT', data);
      if (response?.msg || response?.errors) {
        throw new Error(response?.msg || response?.errors[0].msg);
      }
      if (!data.password) {
        updateUserState(data);
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      getOneUser,
      updateUser,
      toogleFollow,
    }),
    [
      state,
      toogleLikePost,
      deletePostState,
      updatePost,
      getOneUser,
      updateUser,
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
