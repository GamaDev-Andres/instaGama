import { useContext } from 'react';

import inboxContext from '../context/inboxContext';

const useInboxContext = () => {
  const context = useContext(inboxContext);
  if (!context) {
    throw new Error('useInboxContext se utilizo fuera del proveedors');
  }
  return context;
};

export default useInboxContext;
