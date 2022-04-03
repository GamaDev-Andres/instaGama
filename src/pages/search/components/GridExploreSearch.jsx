const GridExploreSearch = () => {
  return (
    <div className="max-w-[935px] mx-auto grid grid-cols-3 grid-rows-2 gap-[2px] md:gap-7 mt-1 md:mt-7 grid-flow-row-dense">
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,

        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      ].map((el, i) => {
        return (
          <div
            key={el}
            className={`aspect-square ${
              i + 1 === 2 || el % 12 === 0 ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <img
              className="object-cover h-full w-full"
              src="https://picsum.photos/400"
              alt="img"
            />
          </div>
        );
      })}
    </div>
  );
};

export default GridExploreSearch;
