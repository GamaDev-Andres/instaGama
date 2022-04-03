import ResultSearch from './ResultSearch';

const Recents = () => {
  return (
    <div className="flex flex-col max-w-[935px] mx-auto mt-1 md:mt-7">
      <div className="font-semibold font-sans flex justify-between px-4 py-2">
        <h4>Recientes</h4>
        <button className="font-semibold text-azul">Borrar todo</button>
      </div>
      <ResultSearch mode="recent" user="andres.gama" />
      <ResultSearch mode="recent" user="andres.gama" />
    </div>
  );
};

export default Recents;
