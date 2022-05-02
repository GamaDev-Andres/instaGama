import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react/cjs/react.development';
import Modal from '../../../components/Modal';
import Spinner from '../../../components/Spinner';
import socketContext from '../../../contexts/socketContext/socketContext';
import useUser from '../../../hooks/useUser';
import useInboxContext from '../../inbox/hook/useInboxContext';

const ButtonElipsisMessage = ({ idMensaje, mensaje }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [copy, setCopy] = useState(false);
  const { id: u2id } = useParams();
  const { id: uid } = useUser();
  const isMounted = useRef(true);
  const { socket } = useContext(socketContext);
  const { deleteMessageState } = useInboxContext();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (copy) {
      setCopy(false);
    }
  }, [isOpen]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCopyMessage = () => {
    navigator.clipboard
      .writeText(mensaje)
      .then(() => {
        setCopy(true);
      })
      .catch((err) => {
        setCopy(false);
        console.log('Something went wrong', err);
      });
  };
  const handleDeleteMessage = async () => {
    setLoadingDelete(true);
    socket.emit(
      'deleteMensaje',
      { mid: idMensaje, uid, u2id },
      (error, response) => {
        setLoadingDelete(false);
        if (error) {
          throw new Error(error.msg);
        }
        deleteMessageState({ mensaje: response, idChat: u2id });
      }
    );
  };

  return (
    <>
      <button onClick={handleOpenModal} className="p-2 text-sm">
        <i className="fa-solid fa-ellipsis"></i>
      </button>
      {isOpen && (
        <Modal closeModal={handleCloseModal}>
          <div className="flex flex-col text-sm">
            <button
              onClick={handleDeleteMessage}
              disabled={loadingDelete}
              className="center disabled:text-opacity-30 py-2 border-b border-bordes"
            >
              Anular envio
              {loadingDelete && (
                <div className="ml-2">
                  <Spinner />
                </div>
              )}
            </button>
            <button
              onClick={handleCopyMessage}
              className="py-2 border-b border-bordes"
            >
              Copiar
              {copy && <i className="ml-2 fa-solid fa-check"></i>}
            </button>
            <button onClick={handleCloseModal} className="py-2">
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
ButtonElipsisMessage.propTypes = {
  idMensaje: propTypes.string.isRequired,
  mensaje: propTypes.string.isRequired,
};
export default ButtonElipsisMessage;
