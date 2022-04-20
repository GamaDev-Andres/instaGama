import propTypes from 'prop-types';
import { useAuthContext } from '../../hooks/useAuthContext';

const ActionsPost = ({ idPost }) => {
  const { toogleLikePost } = useAuthContext();

  const handleLike = async () => {
    await toogleLikePost(idPost);
  };

  return (
    <div className="p-2 flex">
      <button onClick={handleLike} className="center w-11 h-11">
        <i className="fa-solid fa-heart text-2xl"></i>
      </button>
      <button className="center w-11 h-11">
        <i className="fa-solid fa-comment text-2xl"></i>
      </button>
      <button className="center w-11 h-11">
        <i className="fa-solid fa-share text-2xl"></i>
      </button>
    </div>
  );
};
ActionsPost.propTypes = {
  idPost: propTypes.string.isRequired,
};

export default ActionsPost;