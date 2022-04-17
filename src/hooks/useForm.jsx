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
    setLoading(true);
    const msg = await serviceSubmit(dataForm);
    if (isMounted.current) {
      setLoading(false);
    }

    if (msg) {
      setError(msg);
    }
  };
  return { handleChange, handleSubmit, setError, loading, error, dataForm };
};

export default useForm;
