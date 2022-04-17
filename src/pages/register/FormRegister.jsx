import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import Spinner from '../../components/Spinner';
import { useAuthContext } from '../../hooks/useAuthContext';
import useForm from '../../hooks/useForm';
import { isEmail, isValidPassword } from '../../utilities/validatorsForms';

const FormRegister = () => {
  const { handleRegister } = useAuthContext();
  const {
    dataForm,
    error,
    loading,
    handleSubmit: submitHook,
    setError,
    handleChange,
  } = useForm({ email: '', name: '', password: '' }, handleRegister);

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, email, name } = dataForm;
    if (!isEmail(email)) {
      setError('Formato de email incorrecto');
      return;
    }
    if (name?.length < 4) {
      setError('Nombre demasiado corto,minimo 4 caracteres');
      return;
    }
    if (!isValidPassword(password)) {
      setError('Contraseña muy corta,debe ser minimo 6 caracteres');
      return;
    }
    if (confirmPassword !== password) {
      setError('Las contraseñas no coinciden');
      return;
    }
    await submitHook(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="center-col gap-1 text-sm w-full font-sans"
    >
      <input
        onChange={handleChange}
        value={dataForm.email}
        name="email"
        placeholder="Correo electrónico"
        autoComplete="email"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="email"
      />
      <input
        onChange={handleChange}
        value={dataForm.name}
        name="name"
        placeholder="Nombre"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="text"
        autoComplete="name"
      />
      <input
        onChange={handleChange}
        value={dataForm.password}
        name="password"
        placeholder="Contraseña"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="password"
      />
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        name="confirmPassword"
        placeholder="Confirmar contraseña"
        autoComplete="new-password"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="password"
      />

      <button
        disabled={
          !(dataForm.email && dataForm.password && dataForm.name) || loading
        }
        className="bg-azul mt-4 disabled:bg-opacity-30 font-bold text-white rounded-md py-[5px] px-[9px] w-full"
      >
        {loading ? <Spinner /> : 'Registrate'}
      </button>
      {error && (
        <span className="text-red-600 font-thin text-center">{error}</span>
      )}
      <span className=" py-2">
        ¿Tienes una cuenta?{' '}
        <Link className="text-azul" to="../login">
          Entrar
        </Link>
      </span>
    </form>
  );
};

export default FormRegister;
