import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import usePost from './hook/usePost';

const ActionsPost = ({ idPost, haveMyLike }) => {
  const { handleLikePost, _id } = usePost();
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLike = async () => {
    setLoading(true);
    await handleLikePost(idPost);
    if (isMounted.current) {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 flex">
      <button
        onClick={handleLike}
        disabled={loading}
        className={`center w-11 h-11 ${haveMyLike ? 'text-red-600' : ''}`}
      >
        <i className="fa-solid fa-heart text-2xl"></i>
      </button>
      <Link to={`/coments/${_id}`} className="center w-11 h-11">
        <i className="fa-solid fa-comment text-2xl"></i>
      </Link>
    </div>
  );
};
ActionsPost.propTypes = {
  idPost: propTypes.string.isRequired,
  haveMyLike: propTypes.bool.isRequired,
};

export default ActionsPost;
