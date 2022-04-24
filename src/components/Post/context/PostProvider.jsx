import propTypes from 'prop-types';
import { useCallback } from 'react/cjs/react.development';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { usePostMethods } from '../../../hooks/usePostMethods';
import useUser from '../../../hooks/useUser';
import { customFetch } from '../../../services/customFetch';
import postContext from './postContext';

const PostProvider = ({ data, updatePost, children }) => {
  const { id } = useUser();
  const { deletePostState } = useAuthContext();
  const { updatePost: updatePostService } = usePostMethods();
  const url = import.meta.env.VITE_URL_SERVER;
  const haveMyLike = data.likes.some((obLike) => obLike._id === id);
  const updatePostContext = useCallback(async (idPost, data) => {
    try {
      const response = await updatePostService(idPost, data);
      if (response) {
        updatePost(idPost, data);
      }
    } catch (error) {
      console.log(error);
    }
  });
  const deletePost = useCallback(async () => {
    const urlPeticion = url + '/api/post/' + data._id;
    try {
      const response = await customFetch(urlPeticion, 'DELETE');
      if (response?.msg || response?.errors) {
        throw new Error(response?.msg || response?.errors[0].msg);
      }
      deletePostState(data._id);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <postContext.Provider
      value={{ ...data, haveMyLike, deletePost, updatePost: updatePostContext }}
    >
      {children}
    </postContext.Provider>
  );
};

PostProvider.propTypes = {
  data: propTypes.object.isRequired,
  children: propTypes.any.isRequired,
  updatePost: propTypes.func.isRequired,
};
export default PostProvider;
