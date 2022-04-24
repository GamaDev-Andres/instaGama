import propTypes from 'prop-types';
import { useCallback, useMemo } from 'react/cjs/react.development';
import { customFetch } from '../../services/customFetch';
import postsMethodsContext from './postsMethodsContext';

const PostsMethodsProvider = ({ children }) => {
  const url = import.meta.env.VITE_URL_SERVER;

  const createPost = useCallback(async (data) => {
    const urlPeticion = url + '/api/post/create';
    try {
      const response = await customFetch(urlPeticion, 'POST', data);
      if (response?.msg || response?.errors) {
        throw new Error(response?.msg || response?.errors[0]?.msg);
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
        throw new Error(response?.msg || response?.errors[0]?.msg);
      }
      return response.post;
    } catch (error) {
      console.log(error);
    }
  });
  const updatePost = useCallback(async (idPost, data) => {
    const urlPeticion = url + '/api/post/' + idPost;

    try {
      const response = await customFetch(urlPeticion, 'PUT', {
        descripcion: data,
      });
      if (response?.msg || response?.errors) {
        throw new Error(response?.msg || response?.errors[0].msg);
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  });

  const contextValue = useMemo(
    () => ({
      createPost,
      toogleLikePost,
      updatePost,
    }),
    [createPost, toogleLikePost, updatePost]
  );
  return (
    <postsMethodsContext.Provider value={contextValue}>
      {children}
    </postsMethodsContext.Provider>
  );
};

PostsMethodsProvider.propTypes = {
  children: propTypes.any,
};
export default PostsMethodsProvider;
