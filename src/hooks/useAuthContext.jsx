import { useContext } from 'react';
import authContext from '../contexts/authContext/authContext';

export const useAuthContext = () => {
  // get the context
  const context = useContext(authContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useAuthContext ha sido utilizado fuera de su proveedor');
  }

  return context;
};
