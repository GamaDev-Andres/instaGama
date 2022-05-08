import propTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Spinner from '../../../components/Spinner';
import { useAuthContext } from '../../../hooks/useAuthContext';

import useUser from '../../../hooks/useUser';
import historiesContext from './historiesContext';

const HistoriesProvider = ({ children }) => {
  const { following } = useUser();
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
        following.map((el) => getHistoriesUser(el))
      );
      return historiesOfFollowing;
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = { histories };

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
