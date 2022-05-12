import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { getOnePost } from '../../../services/getOnePost';

const useGetPost = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    isMounted.current = true;
    async function getData() {
      const response = await getOnePost(id);
      if (!response) {
        setLoading(false);
        navigate('/');
      }
      if (isMounted.current && response) {
        setData(response.post);
        setLoading(false);
      }
    }
    getData();

    return () => {
      isMounted.current = false;
    };
  }, [id]);
  return { loading, data, setData };
};

export default useGetPost;
