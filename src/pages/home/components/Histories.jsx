import History from './History';

const Histories = () => {
  return (
    <div className="h-[110px] center">
      {[1, 2, 3].map((el) => (
        <History key={el} />
      ))}
    </div>
  );
};

export default Histories;
