import propTypes from 'prop-types';
import { useContext, useState } from 'react';

import socketContext from '../../../contexts/socketContext/socketContext';
import useUser from '../../../hooks/useUser';
import useInboxContext from '../../inbox/hook/useInboxContext';

const ContainerInputMessage = ({ uid }) => {
  const [input, setInput] = useState('');
  const { socket } = useContext(socketContext);
  const { addMessageState } = useInboxContext();
  const { id } = useUser();
  const handleSubmit = () => {
    if (!input.trim()) {
      return;
    }
    socket.emit(
      'mensaje',
      {
        id,
        uid,
        mensaje: input,
      },
      (error, res) => {
        if (error) {
          throw new Error('Hubo un error en el envio de un mensaje');
        }

        addMessageState(res, uid);
      }
    );
    setInput('');
  };
  const handleKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();

      handleSubmit();
    }
  };
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className=" p-4 bg-fondoClaro border-t border-bordes">
      <div className="center rounded-3xl border border-bordes p-2 gap-2">
        <div className="center flex-grow">
          <textarea
            onChange={handleInput}
            onKeyDown={handleKeyPress}
            value={input}
            placeholder="Envía un mensaje..."
            className=" mr-[2px] flex-grow overflow-y-auto leading-[18px] h-[18px] text-sm box-content p-2 resize-none outline-none"
          ></textarea>
        </div>
        {input ? (
          <button onClick={handleSubmit} className="p-2 center">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        ) : (
          <button className="p-2 center">
            <i className="fa-solid fa-image"></i>
          </button>
        )}
      </div>
    </div>
  );
};
ContainerInputMessage.propTypes = {
  uid: propTypes.string.isRequired,
};
export default ContainerInputMessage;
