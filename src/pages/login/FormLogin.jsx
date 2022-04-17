import { Link } from 'react-router-dom';

const FormLogin = () => {
  return (
    <form className="center-col gap-1 text-sm w-full font-sans">
      <input
        placeholder="Correo electrónico"
        autoComplete="email"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="email"
      />
      <input
        placeholder="Contraseña"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="password"
      />
      <Link className="self-end text-azul py-2" to=".">
        ¿Has olvidado la contraseña?
      </Link>
      <button
        disabled
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
