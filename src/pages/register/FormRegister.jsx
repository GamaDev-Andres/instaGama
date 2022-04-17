import { Link } from 'react-router-dom';

const FormRegister = () => {
  return (
    <form className="center-col gap-1 text-sm w-full font-sans">
      <input
        placeholder="Correo electrónico"
        autoComplete="email"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="email"
      />
      <input
        placeholder="Nombre"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="text"
        autoComplete="name"
      />
      <input
        placeholder="Contraseña"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="password"
      />
      <input
        placeholder="Confirmar contraseña"
        autoComplete="new-password"
        className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
        type="password"
      />

      <button
        disabled
        className="bg-azul mt-4 disabled:bg-opacity-30 font-bold text-white rounded-md py-[5px] px-[9px] w-full"
      >
        Registrate
      </button>
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
