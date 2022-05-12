import propTypes from 'prop-types';
import { useState } from 'react';

import useProfile from '../hook/useProfile';

const ChangeName = ({ handleCloseModal }) => {
  const {
    updateUser,
    state: { name },
  } = useProfile();
  const [inputName, setinputName] = useState(name);
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputName.trim().length < 4) {
      setSucces(null);
      setError('Nombre demasiado corto, minimo 4 caracteres.');
      return;
    }
    setLoading(true);
    const res = await updateUser({ name: inputName });
    setLoading(false);
    if (res) {
      setSucces('Cambios guardados.');
      setError(null);
    }
  };

  const handleChange = (e) => {
    setinputName(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col px-2 text-sm">
        <h2 className="text-center font-semibold px-2 py-4">Cambiar nombre</h2>
        <input
          autoFocus={true}
          onChange={handleChange}
          value={inputName}
          name="name"
          placeholder="Nombre"
          className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
          type="text"
          autoComplete="off"
        />
        {error && (
          <span className="font-thin text-center text-red-500">{error}</span>
        )}
        {succes && (
          <span className="font-thin text-center text-azul">{succes}</span>
        )}
        <button
          disabled={loading}
          className="text-azul font-semibold text-center disabled:text-opacity-30 pt-4"
        >
          Enviar
        </button>
      </form>
      <button
        onClick={handleCloseModal}
        className="py-4 font-sans text-center w-full"
      >
        Cancelar
      </button>
    </div>
  );
};
ChangeName.propTypes = {
  handleCloseModal: propTypes.func.isRequired,
};
export default ChangeName;
