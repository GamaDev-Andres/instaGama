import { useContext } from 'react';
import postsMethodsContext from '../contexts/PostsMethodsContext/postsMethodsContext';

export const usePostMethods = () => {
  // get the context
  const context = useContext(postsMethodsContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('usePostMethods ha sido utilizado fuera de su proveedor');
  }

  return context;
};
