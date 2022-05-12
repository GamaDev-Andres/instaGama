import propTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';

import useProfile from '../pages/profile/hook/useProfile';
import PostProvider from './Post/context/PostProvider';
import Post from './Post/Post';

const ListOfPosts = ({
  arrPosts = [],
  handleUpdatePost,
  handleLikePost,
  handleDeletePost,
}) => {
  const outletContext = useOutletContext();
  const arrToRender = outletContext?.posts || arrPosts;
  const contextProfile = useProfile();

  return (
    <div className="flex-grow flex flex-col gap-4 sm:gap-8 relative pb-[45px]">
      {arrToRender.length === 0 ? (
        <div className="text-grisLetra font-bold text-center text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          Aún no tenemos publicaciones para mostrarte intenta seguir a otras
          personas o subir contenido.
        </div>
      ) : (
        arrToRender?.map((post) => (
          <PostProvider
            data={post}
            updatePost={handleUpdatePost || contextProfile.updatePost}
            handleDeletePost={
              handleDeletePost || contextProfile.deletePostState
            }
            handleLikePostState={
              handleLikePost || contextProfile.toogleLikePost
            }
            key={post._id}
          >
            <Post />
          </PostProvider>
        ))
      )}
    </div>
  );
};
ListOfPosts.propTypes = {
  arrPosts: propTypes.array,
  handleUpdatePost: propTypes.func,
  handleLikePost: propTypes.func,
  handleDeletePost: propTypes.func,
};
export default ListOfPosts;
