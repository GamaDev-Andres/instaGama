import { useContext } from 'react';

import postContext from '../context/postContext';

const usePost = () => {
  const context = useContext(postContext);
  return { ...context };
};

export default usePost;
