import { useContext } from 'react';
import pageComentContext from '../context/pageComentContext';

const usePageComentContext = () => {
  const context = useContext(pageComentContext);
  if (!context) {
    throw new Error('usePageComentContext se utilizo fuera del contexto');
  }

  return context;
};

export default usePageComentContext;
