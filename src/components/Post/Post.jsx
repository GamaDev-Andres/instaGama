import propTypes from 'prop-types';
import DescriptionPost from './DescriptionPost';
import HeaderPost from './HeaderPost';

const Post = ({ data }) => {
  return (
    <article className="w-full bg-fondoClaro">
      <HeaderPost autor={data?.autor} />
      <div className="flex flex-col">
        <img
          className="object-cover w-full select-none"
          src={data.url}
          alt="img"
        />
        <div className="p-2 flex">
          <button className="center w-11 h-11">
            <i className="fa-solid fa-heart text-2xl"></i>
          </button>
          <button className="center w-11 h-11">
            <i className="fa-solid fa-comment text-2xl"></i>
          </button>
          <button className="center w-11 h-11">
            <i className="fa-solid fa-share text-2xl"></i>
          </button>
        </div>
      </div>
      <DescriptionPost descripcion={data.descripcion} />
    </article>
  );
};
Post.propTypes = {
  data: propTypes.any.isRequired,
};
export default Post;
