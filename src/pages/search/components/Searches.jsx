import { useContext } from 'react';
import searchContext from '../context/searchContext';
import Recents from './Recents';
import ResultSearch from './ResultSearch';

const Searches = () => {
  const { input } = useContext(searchContext);

  if (!input) {
    return <Recents />;
  }
  return (
    <div className="mt-2">
      {[1, 2, 3, 4, 5].map((el) => (
        <ResultSearch user="andres.gama" key={el} />
      ))}
    </div>
  );
};

export default Searches;
