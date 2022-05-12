import { useContext } from 'react';

import authContext from '../contexts/authContext/authContext';

export const useAuthContext = () => {
  const context = useContext(authContext);

  if (context === undefined) {
    throw new Error('useAuthContext ha sido utilizado fuera de su proveedor');
  }

  return context;
};
