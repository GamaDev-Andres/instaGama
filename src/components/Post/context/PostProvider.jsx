import propTypes from 'prop-types';
import { useCallback } from 'react/cjs/react.development';
import { useAuthContext } from '../../../hooks/useAuthContext';
import useUser from '../../../hooks/useUser';
import { customFetch } from '../../../services/customFetch';
import postContext from './postContext';

const PostProvider = ({ data, children }) => {
  const { id } = useUser();
  const { deletePostState } = useAuthContext();

  const url = import.meta.env.VITE_URL_SERVER;
  const haveMyLike = data.likes.some((obLike) => obLike._id === id);

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
    <postContext.Provider value={{ ...data, haveMyLike, deletePost }}>
      {children}
    </postContext.Provider>
  );
};

PostProvider.propTypes = {
  data: propTypes.object.isRequired,
  children: propTypes.any.isRequired,
};
export default PostProvider;
