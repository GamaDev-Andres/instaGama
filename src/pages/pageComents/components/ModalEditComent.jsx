import propTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';
import Modal from '../../../components/Modal';
import usePageComentContext from '../hook/usePageComentContext';

const ModalEditComent = ({ closeModal, text, idComent }) => {
  const [inputComent, setinputComent] = useState(text);
  const [uiMsg, setUiMsg] = useState({ type: null, msg: null });
  const [loading, setLoading] = useState(false);

  const { updateComent } = usePageComentContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputComent.trim()) {
      setUiMsg({ type: 'error', msg: 'Comentario vacio.' });
      return;
    }
    setLoading(true);
    const res = await updateComent(idComent, { text: inputComent });
    setLoading(false);
    if (res.ok) {
      setUiMsg({ type: 'exito', msg: 'Cambios guardados.' });
    }
  };

  const handleChange = (e) => {
    setinputComent(e.target.value);
  };
  return (
    <Modal closeModal={closeModal}>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col px-2 text-sm">
          <h2 className="text-center font-semibold px-2 py-4">
            Editar comentario
          </h2>
          <input
            autoFocus={true}
            onChange={handleChange}
            value={inputComent}
            name="comentario"
            placeholder="Añade un comentario..."
            className="focus:border-gray-400 placeholder:text-xs bg-fondoGris w-full border border-bordes outline-none p-2"
            type="text"
            autoComplete="off"
          />
          {uiMsg.msg && (
            <span
              className={`font-thin text-center ${
                uiMsg.type === 'error' ? 'text-red-500' : 'text-azul'
              }`}
            >
              {uiMsg.msg}
            </span>
          )}

          <button
            disabled={loading}
            className="text-azul font-semibold text-center disabled:text-opacity-30 pt-4"
          >
            Enviar
          </button>
        </form>
        <button
          onClick={closeModal}
          className="py-4 font-sans text-center w-full"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};
ModalEditComent.propTypes = {
  closeModal: propTypes.func.isRequired,
  text: propTypes.string.isRequired,
  idComent: propTypes.string.isRequired,
};
export default ModalEditComent;
