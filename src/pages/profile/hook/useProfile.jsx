import { useContext } from 'react/cjs/react.development';
import profileContext from '../context/profileContext';

const useProfile = () => {
  const context = useContext(profileContext);

  return context;
};

export default useProfile;
