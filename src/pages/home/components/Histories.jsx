import useUser from '../../../hooks/useUser';
import useHistoriesContext from '../hooks/useHistoriesContext';
import CarouselHistories from './CarouselHistories';
import History from './History';
const Histories = () => {
  const { histories: historiesUser } = useUser();
  const { histories } = useHistoriesContext();

  return (
    <div className="h-[110px] center sm:mt-8 border border-transparent sm:border sm:border-bordes sm:rounded-md sm:bg-fondoClaro">
      <CarouselHistories>
        {[historiesUser, ...histories]?.map((el) => (
          <History data={el} key={el.autor._id} />
        ))}
      </CarouselHistories>
    </div>
  );
};

export default Histories;
