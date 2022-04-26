import propTypes from 'prop-types';
import { useCallback } from 'react/cjs/react.development';
import { usePostMethods } from '../../../hooks/usePostMethods';
import useUser from '../../../hooks/useUser';
import { customFetch } from '../../../services/customFetch';
import postContext from './postContext';

const PostProvider = ({
  data,
  updatePost,
  handleDeletePost,
  handleLikePostState,
  children,
}) => {
  const { id } = useUser();
  const { updatePost: updatePostService, toogleLikePost } = usePostMethods();
  const url = import.meta.env.VITE_URL_SERVER;
  const haveMyLike = data.likes.some(
    (obLike) => obLike._id === id || obLike === id
  );

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
      handleDeletePost(data._id);
      return response;
    } catch (error) {
      console.log(error);
    }
  });

  const handleLikePost = useCallback(async () => {
    try {
      const post = await toogleLikePost(data._id);
      handleLikePostState(post);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <postContext.Provider
      value={{
        ...data,
        haveMyLike,
        deletePost,
        updatePost: updatePostContext,
        handleLikePost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

PostProvider.propTypes = {
  data: propTypes.object.isRequired,
  children: propTypes.any.isRequired,
  updatePost: propTypes.func.isRequired,
  handleDeletePost: propTypes.func.isRequired,
  handleLikePostState: propTypes.func.isRequired,
};
export default PostProvider;
