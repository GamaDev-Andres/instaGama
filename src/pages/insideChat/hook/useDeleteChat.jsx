import { useEffect, useState, useCallback, useRef } from 'react';

import { customFetch } from '../../../services/customFetch';

const useDeleteChat = () => {
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);
  const deleteChat = useCallback(async (idChat) => {
    const url = import.meta.env.VITE_URL_SERVER;

    try {
      const urlPeticion = url + '/api/inbox/chat/' + idChat;
      setLoading(true);
      const response = await customFetch(urlPeticion, 'DELETE');
      if (response?.msg || response?.errors) {
        throw new Error(response?.msg || response?.errors[0]?.msg);
      }
      if (isMounted.current) {
        setLoading(false);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { deleteChat, loading };
};

export default useDeleteChat;
