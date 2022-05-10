import { useState } from 'react/cjs/react.development';
import { customFetch } from '../../../services/customFetch';
import useHistoriesContext from './useHistoriesContext';

const useCreateHistory = () => {
  const url = import.meta.env.VITE_URL_SERVER;

  const [loading, setloading] = useState(false);
  const { addHistoryState } = useHistoriesContext();

  const handleCreateHistory = async (data) => {
    try {
      const urlPeticion = `${url}/api/history`;
      setloading(true);
      const response = await customFetch(urlPeticion, 'POST', data);
      setloading(false);
      if (response?.msg || response?.errors) {
        throw new Error(response?.msg || response?.errors[0]?.msg);
      }
      addHistoryState(response.historia);
    } catch (error) {
      console.log(error);
    }
  };
  return { handleCreateHistory, loading };
};

export default useCreateHistory;
