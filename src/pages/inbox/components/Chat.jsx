import { Link } from 'react-router-dom';
import HeroImage from '../../../components/HeroImage';

const Chat = () => {
  return (
    <Link
      className="outline-none hover:bg-fondoGris focus:bg-fondoGris"
      to="juanito hernadez"
    >
      <div className="flex items-center w-full gap-3 font-sans text-sm px-4 py-2">
        <HeroImage className="w-[56px]" />
        <div className="w-full min-w-0">
          <h4 className="capitalize whitespace-nowrap text-ellipsis overflow-hidden">
            pepito perez
          </h4>
          <div className="text-grisLetra flex w-full min-w-0">
            <span className="first-letter:uppercase min-w-0 whitespace-nowrap text-ellipsis overflow-hidden block">
              activo o ultimo mensaje mas cositas
            </span>
            <span className="mx-[2px] font-semibold">·</span>
            <span>fecha</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Chat;
