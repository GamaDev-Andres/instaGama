import propTypes from 'prop-types';
import Post from './Post/Post';

const ListOfPosts = ({ arrPosts = [] }) => {
  console.log(arrPosts);
  return (
    <div className="flex-grow flex flex-col gap-4 sm:gap-8">
      {arrPosts?.map((post) => (
        <Post data={post} key={post._id} />
      ))}
    </div>
  );
};
ListOfPosts.propTypes = {
  arrPosts: propTypes.array,
};
export default ListOfPosts;
