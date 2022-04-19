import { useState, useEffect } from 'react';
import { useRef } from 'react/cjs/react.development';

const useForm = (dataInitial, serviceSubmit) => {
  const [dataForm, setDataForm] = useState(dataInitial);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(dataForm);
      const msg = await serviceSubmit(dataForm);
      setLoading(false);
      if (msg) {
        setError(msg);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return { handleChange, handleSubmit, setError, loading, error, dataForm };
};

export default useForm;
