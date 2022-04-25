import { useEffect, useRef, useState } from 'react/cjs/react.development';
import Spinner from '../../../components/Spinner';
import { useAuthContext } from '../../../hooks/useAuthContext';
import History from './History';

const Histories = () => {
  const { state, getHistoriesOfFollowing } = useAuthContext();
  const [histories, setHistories] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);
  useEffect(() => {
    setLoading(true);
    getHistoriesOfFollowing()
      .then((arrOfHistories) => {
        const histories = arrOfHistories
          .filter((el) => el.length)
          .map((el) => ({ autor: el[0].autor, histories: el }));
        if (isMounted.current) {
          setHistories(histories);
          setLoading(false);
        }
      })
      .catch(console.log);
    return () => {
      setLoading(false);
      isMounted.current = false;
    };
  }, [getHistoriesOfFollowing]);

  if (!histories || loading) {
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
