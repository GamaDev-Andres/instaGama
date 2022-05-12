import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import socketContext from '../../../contexts/socketContext/socketContext';
import useInput from '../../../hooks/useInput';
import useUser from '../../../hooks/useUser';
import usePageComentContext from '../hook/usePageComentContext';

const ContainerInputComent = () => {
  const { idPost } = useParams();
  const { reset, handleChange, input } = useInput();
  const { socket } = useContext(socketContext);
  const { id } = useUser();
  const { addComentToState } = usePageComentContext();
  const handleSubmitComent = () => {
    socket.emit(
      'newComent',
      { idPost, text: input, autor: id },
      (error, res) => {
        if (error) {
          console.log(error);
          return;
        }
        addComentToState(res);
      }
    );
    reset();
  };

  return (
    <div className="border border-bordes rounded-full py-2 px-4 min-w-0 flex-grow bg-fondoClaro">
      <div className="center gap-2">
        <textarea
          onChange={handleChange}
          value={input}
          className="mr-[2px] flex-grow overflow-y-auto py-3 leading-[18px] h-[18px] max-h-[36px] text-sm box-content resize-none outline-none"
          placeholder="Añade un comentario..."
        />
        <button
          disabled={input.trim().length <= 0}
          onClick={handleSubmitComent}
          className="text-azul disabled:text-opacity-30 flex-shrink font-semibold"
        >
          Publicar
        </button>
      </div>
    </div>
  );
};

export default ContainerInputComent;
