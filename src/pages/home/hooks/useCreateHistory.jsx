import { useState } from 'react/cjs/react.development';
import { customFetch } from '../../../services/customFetch';

const useCreateHistory = () => {
  const url = import.meta.env.VITE_URL_SERVER;

  const [loading, setloading] = useState(false);
  const handleCreateHistory = async (data) => {
    try {
      const urlPeticion = `${url}/api/history`;
      setloading(true);
      const response = await customFetch(urlPeticion, 'POST', data);
      setloading(false);
      if (response?.msg || response?.errors) {
        throw new Error(response?.msg || response?.errors[0]?.msg);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return { handleCreateHistory, loading };
};

export default useCreateHistory;
