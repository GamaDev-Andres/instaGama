import propTypes from 'prop-types';
import ActionsPost from './ActionsPost';
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
        <ActionsPost idPost={data._id} />
      </div>
      <DescriptionPost likes={data.likes} descripcion={data.descripcion} />
    </article>
  );
};
Post.propTypes = {
  data: propTypes.any.isRequired,
};
export default Post;
