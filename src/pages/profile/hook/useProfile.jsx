import { useContext } from 'react';

import profileContext from '../context/profileContext';

const useProfile = () => {
  const context = useContext(profileContext);
  return context;
};

export default useProfile;
