import propTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react/cjs/react.development';
import { confirmPassword } from '../../../services/confirmPassword';
import { isValidPassword } from '../../../utilities/validatorsForms';
import useProfile from '../hook/useProfile';

const initialDataForm = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ChangePassword = ({ handleCloseModal }) => {
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState(initialDataForm);
  const isMounted = useRef(true);
  const { updateUser } = useProfile();

  const { currentPassword, newPassword, confirmNewPassword } = dataForm;

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
    const isSamePassword = await confirmPassword(currentPassword);
    if (!isSamePassword) {
      setError('Tu contraseña actual es incorrecta');
      return;
    }
    if (!isValidPassword(newPassword)) {
      setError('Contraseña muy corta,debe ser minimo 6 caracteres');
      return;
    }
    if (confirmNewPassword !== newPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    const res = await updateUser({ password: newPassword });
    if (isMounted.current) {
      setLoading(false);
      if (res) {
        setSucces('Cambios guardados');
      } else {
        setError('Algo salio mal');
      }
      setDataForm(initialDataForm);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-center font-semibold px-2 py-4">
        Cambiar contraseña
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 px-2 text-sm"
      >
        <input
          onChange={handleChange}
          value={currentPassword}
          name="currentPassword"
          autoComplete="current-password"
          placeholder="Contraseña actual"
          className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
          type="password"
        />
        <input
          onChange={handleChange}
          value={newPassword}
          name="newPassword"
          autoComplete="new-password"
          placeholder="Nueva contraseña"
          className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
          type="password"
        />
        <input
          onChange={handleChange}
          value={confirmNewPassword}
          name="confirmNewPassword"
          placeholder="Confirmar nueva contraseña"
          autoComplete="new-password"
          className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
          type="password"
        />
        {error && (
          <span className="font-thin text-center text-red-500">{error}</span>
        )}
        {succes && (
          <span className="font-thin text-center text-azul">{succes}</span>
        )}
        <button
          disabled={loading}
          className="text-azul font-semibold text-center disabled:text-opacity-30"
        >
          Enviar
        </button>
      </form>

      <button onClick={handleCloseModal} className="py-4 font-sans">
        Cancelar
      </button>
    </div>
  );
};

ChangePassword.propTypes = {
  handleCloseModal: propTypes.func.isRequired,
};

export default ChangePassword;
