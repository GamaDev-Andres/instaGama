import propTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import { useAuthContext } from '../../../hooks/useAuthContext';
import Spinner from '../../../components/Spinner';
import useUser from '../../../hooks/useUser';
import historiesContext from './historiesContext';

const HistoriesProvider = ({ children }) => {
  const { following, id, name, userName, foto } = useUser();
  const { getHistoriesUser } = useAuthContext();
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
          if (histories[0]?.autor?.id !== id) {
            histories.unshift({
              autor: { id, name, foto, userName },
              histories: [],
            });
          }
          setHistories(histories);
          setLoading(false);
        }
      })
      .catch(console.log);
    return () => {
      setLoading(false);
      isMounted.current = false;
    };
  }, []);

  const getHistoriesOfFollowing = async () => {
    try {
      const historiesOfFollowing = await Promise.all(
        [id, ...following].map((el) => getHistoriesUser(el))
      );
      return historiesOfFollowing;
    } catch (error) {
      console.log(error);
    }
  };
  const addHistoryState = (history) => {
    setHistories(
      histories.map((hist) =>
        hist.autor.id === id
          ? { ...hist, histories: [...hist.histories, history] }
          : hist
      )
    );
  };
  const contextValue = { histories, addHistoryState };

  if (!histories || loading) {
    return <Spinner />;
  }
  return (
    <historiesContext.Provider value={contextValue}>
      {children}
    </historiesContext.Provider>
  );
};

HistoriesProvider.propTypes = {
  children: propTypes.any,
};
export default HistoriesProvider;
