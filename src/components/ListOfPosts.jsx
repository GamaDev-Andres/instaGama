import Post from './Post';

const ListOfPosts = () => {
  return (
    <div className="flex-grow flex flex-col gap-4 sm:gap-8">
      {[1, 2, 3, 4, 5, 6].map((post) => (
        <Post data={post} key={post} />
      ))}
    </div>
  );
};

export default ListOfPosts;
