import useHistoriesContext from '../hooks/useHistoriesContext';
import CarouselHistories from './CarouselHistories';
import History from './History';

const Histories = () => {
  const { histories } = useHistoriesContext();
  return (
    <div className="h-[110px] center sm:mt-8 border border-transparent sm:border sm:border-bordes sm:rounded-md sm:bg-fondoClaro">
      <CarouselHistories>
        {histories?.map((el) => (
          <History data={el} key={el.autor?.id || el.autor._id} />
        ))}
      </CarouselHistories>
    </div>
  );
};

export default Histories;
