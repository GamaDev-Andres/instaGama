import propTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import Post from './Post/Post';

const ListOfPosts = ({ arrPosts = [] }) => {
  const outletContext = useOutletContext();
  const arrToRender = outletContext?.posts || arrPosts;
  return (
    <div className="flex-grow flex flex-col gap-4 sm:gap-8">
      {arrToRender?.map((post) => (
        <Post data={post} key={post._id} />
      ))}
    </div>
  );
};
ListOfPosts.propTypes = {
  arrPosts: propTypes.array,
};
export default ListOfPosts;
