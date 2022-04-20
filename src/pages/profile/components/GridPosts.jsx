import { useOutletContext } from 'react-router-dom';

const GridPosts = () => {
  const outletContext = useOutletContext();
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-7 relative flex-grow">
      {outletContext?.posts.length === 0 ? (
        <div className="text-grisLetra font-bold text-center text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          Aún no tenemos publicaciones para mostrarte intenta seguir a otras
          personas o subir contenido.
        </div>
      ) : (
        outletContext?.posts?.map((el) => (
          <div className="aspect-square" key={el._id}>
            <img
              className="object-cover h-full w-full"
              src={el.url}
              alt="img"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default GridPosts;
