import { useAuthContext } from './useAuthContext';

const useUser = () => {
  const {
    state: { user },
  } = useAuthContext();
  return { ...user };
};

export default useUser;
