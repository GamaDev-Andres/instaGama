import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeroImage from '../../../components/HeroImage';
import { timeAgo } from '../../../utilities/timeAgo';

const Chat = ({ data }) => {
  const lastMessage = data.mensajes.slice(-1)[0];
  const dateInMs = new Date(lastMessage.fecha).getTime();
  return (
    <Link
      className="outline-none hover:bg-fondoGris focus:bg-fondoGris"
      to={data.with.id}
    >
      <div className="flex items-center w-full gap-3 font-sans text-sm px-4 py-2">
        <HeroImage url={data.with.foto} className="w-[56px]" />
        <div className="w-full min-w-0">
          <h4 className="capitalize whitespace-nowrap text-ellipsis overflow-hidden">
            {data.with.name}
          </h4>
          <div className="text-grisLetra flex w-full min-w-0">
            <span className="first-letter:uppercase min-w-0 whitespace-nowrap text-ellipsis overflow-hidden block">
              {lastMessage.mensaje}
            </span>
            <span className="mx-[2px] font-semibold">·</span>
            <span>{timeAgo(dateInMs, 'es-ES')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

Chat.propTypes = {
  data: propTypes.object.isRequired,
};
export default Chat;
