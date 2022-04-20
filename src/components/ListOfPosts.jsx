import propTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import Post from './Post/Post';

const ListOfPosts = ({ arrPosts = [] }) => {
  const outletContext = useOutletContext();
  const arrToRender = outletContext?.posts || arrPosts;
  return (
    <div className="flex-grow flex flex-col gap-4 sm:gap-8 relative">
      {arrToRender.length === 0 ? (
        <div className="text-grisLetra font-bold text-center text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          Aún no tenemos publicaciones para mostrarte intenta seguir a otras
          personas o subir contenido.
        </div>
      ) : (
        arrToRender?.map((post) => <Post data={post} key={post._id} />)
      )}
    </div>
  );
};
ListOfPosts.propTypes = {
  arrPosts: propTypes.array,
};
export default ListOfPosts;
