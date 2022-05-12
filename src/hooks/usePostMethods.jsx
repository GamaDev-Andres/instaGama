import { useContext } from 'react';

import postsMethodsContext from '../contexts/PostsMethodsContext/postsMethodsContext';

export const usePostMethods = () => {
  const context = useContext(postsMethodsContext);

  if (context === undefined) {
    throw new Error('usePostMethods ha sido utilizado fuera de su proveedor');
  }

  return context;
};
