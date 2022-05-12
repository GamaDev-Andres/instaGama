import ActionsPost from './ActionsPost';
import DescriptionPost from './DescriptionPost';
import HeaderPost from './HeaderPost';
import usePost from './hook/usePost';

const Post = () => {
  const { haveMyLike, url, _id, likes, descripcion } = usePost();
  return (
    <article className="w-full bg-fondoClaro">
      <HeaderPost />
      <div className="flex flex-col h-full">
        <img
          className="object-contain h-full max-h-[100vh] select-none"
          src={url}
          alt="img"
        />
        <ActionsPost idPost={_id} haveMyLike={haveMyLike} />
      </div>
      <DescriptionPost likes={likes} descripcion={descripcion} />
    </article>
  );
};

export default Post;
