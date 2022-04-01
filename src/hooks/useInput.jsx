import { useState } from 'react';

const useInput = (initialInput = '') => {
  const [input, setInput] = useState(initialInput);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const reset = () => {
    setInput('');
  };
  return { reset, handleChange, input };
};

export default useInput;
