import { dateToMs } from '../../adapters/dateToMs';
import { timeAgo } from '../../utilities/timeAgo';
import ActionsPost from './ActionsPost';
import DescriptionPost from './DescriptionPost';
import HeaderPost from './HeaderPost';
import usePost from './hook/usePost';

const Post = () => {
  const { haveMyLike, url, _id, likes, descripcion, createdAt } = usePost();
  return (
    <article className="w-full bg-fondoClaro border border-transparent sm:border sm:border-bordes">
      <HeaderPost />
      <div className="flex flex-col h-full">
        <img
          className="object-contain h-full max-h-[100vh] select-none"
          src={url}
          loading="lazy"
          alt="imagen post"
        />
        <ActionsPost idPost={_id} haveMyLike={haveMyLike} />
      </div>
      <DescriptionPost likes={likes} descripcion={descripcion} />
      <small className="pb-2 px-4 text-grisLetra text-xs">
        {timeAgo(dateToMs(createdAt))}
      </small>
    </article>
  );
};

export default Post;
