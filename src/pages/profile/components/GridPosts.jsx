import { useOutletContext } from 'react-router-dom';

const GridPosts = () => {
  const outletContext = useOutletContext();
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-7">
      {outletContext?.posts?.map((el) => (
        <div className="aspect-square" key={el._id}>
          <img className="object-cover h-full w-full" src={el.url} alt="img" />
        </div>
      ))}
    </div>
  );
};

export default GridPosts;
