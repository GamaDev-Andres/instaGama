import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useAuthContext } from '../../hooks/useAuthContext';
import useForm from '../../hooks/useForm';
import { isEmail, isValidPassword } from '../../utilities/validatorsForms';

const FormLogin = () => {
  const { handleLogin } = useAuthContext();
  const {
    dataForm,
    error,
    loading,
    handleSubmit: submitHook,
    setError,
    handleChange,
  } = useForm({ email: '', password: '' }, handleLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, email } = dataForm;
    if (!isEmail(email)) {
      setError('Formato de email incorrecto');
      return;
    }
    if (!isValidPassword(password)) {
      setError('Contraseña muy corta,debe ser minimo 6 caracteres');
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
        value={dataForm.passowrd}
        name="password"
        autoComplete="current-password"
        placeholder="Contraseña"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="password"
      />
      <Link className="self-end text-azul py-2" to=".">
        ¿Has olvidado la contraseña?
      </Link>
      <button
        disabled={!(dataForm.email && dataForm.password) || loading}
        className="bg-azul disabled:bg-opacity-30 font-bold text-white rounded-md py-[5px] px-[9px] w-full"
      >
        {loading ? <Spinner /> : 'iniciar sesión'}
      </button>
      {error && (
        <span className="text-red-600 font-thin text-center">{error}</span>
      )}
      <span className=" py-2">
        ¿No tienes una cuenta?{' '}
        <Link className="text-azul" to="../register">
          Registrate
        </Link>
      </span>
    </form>
  );
};

export default FormLogin;
