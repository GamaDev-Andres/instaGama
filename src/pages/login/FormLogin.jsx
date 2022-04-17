import { Link } from 'react-router-dom';
import { useContext, useState } from 'react/cjs/react.development';
import authContext from '../../contexts/authContext/authContext';

const FormLogin = () => {
  const { handleLogin } = useContext(authContext);
  const [dataForm, setDataForm] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(dataForm);
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
        placeholder="Contraseña"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="password"
      />
      <Link className="self-end text-azul py-2" to=".">
        ¿Has olvidado la contraseña?
      </Link>
      <button
        disabled={!(dataForm.email && dataForm.password)}
        className="bg-azul disabled:bg-opacity-30 font-bold text-white rounded-md py-[5px] px-[9px] w-full"
      >
        iniciar sesión
      </button>
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
