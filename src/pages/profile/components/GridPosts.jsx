const GridPosts = () => {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-7">
      {[1, 2, 3, 4, 5, 6, 7].map((el) => (
        <div className="aspect-square" key={el}>
          <img
            className="object-cover h-full w-full"
            src="https://picsum.photos/100/200"
            alt="img"
          />
        </div>
      ))}
    </div>
  );
};

export default GridPosts;
