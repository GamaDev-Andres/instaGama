import propTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import Modal from '../../../components/Modal';
import Spinner from '../../../components/Spinner';
import usePageComentContext from '../hook/usePageComentContext';

const ModalOptionsComent = ({ idComent, closeModal, openModalEditComent }) => {
  const [loading, setLoading] = useState(false);
  const { deleteComent } = usePageComentContext();
  const isMounted = useRef(true);
  const handleDeleteComent = async () => {
    setLoading(true);
    await deleteComent(idComent);
    if (isMounted.current) {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col">
        <button
          onClick={handleDeleteComent}
          className="p-2 h-12 text-center text-sm border-b border-bordes font-semibold text-red-600"
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Eliminar'}
        </button>
        <button
          disabled={loading}
          onClick={openModalEditComent}
          className="p-2 h-12 text-center text-sm border-b border-bordes"
        >
          Editar
        </button>
        <button onClick={closeModal} className="p-2 h-12 text-center text-sm">
          Cancelar
        </button>
      </div>
    </Modal>
  );
};
ModalOptionsComent.propTypes = {
  closeModal: propTypes.func.isRequired,
  openModalEditComent: propTypes.func.isRequired,
  idComent: propTypes.string.isRequired,
};
export default ModalOptionsComent;
