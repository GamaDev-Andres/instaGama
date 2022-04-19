import { useEffect, useState } from 'react/cjs/react.development';
import Spinner from '../../../components/Spinner';
import { useAuthContext } from '../../../hooks/useAuthContext';
import History from './History';

const Histories = () => {
  const { state, getHistoriesOfFollowing } = useAuthContext();
  const [histories, setHistories] = useState(null);
  useEffect(() => {
    getHistoriesOfFollowing()
      .then((arrOfHistories) => {
        const histories = arrOfHistories
          .filter((el) => el.length)
          .map((el) => ({ autor: el[0].autor, histories: el }));
        setHistories(histories);
      })
      .catch(console.log);
  }, [getHistoriesOfFollowing]);

  if (!histories) {
    return <Spinner />;
  }
  return (
    <div className="h-[110px] center">
      {[state.user.histories, ...histories]?.map((el) => (
        <History data={el} key={el.autor._id} />
      ))}
    </div>
  );
};

export default Histories;
