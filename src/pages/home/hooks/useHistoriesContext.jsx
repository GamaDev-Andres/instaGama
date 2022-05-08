import { useContext } from 'react/cjs/react.development';
import historiesContext from '../context/historiesContext';

const useHistoriesContext = () => {
  const context = useContext(historiesContext);
  return context;
};

export default useHistoriesContext;
