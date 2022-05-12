import propTypes from 'prop-types';

import Spinner from '../Spinner';

const OptionsConfigPost = ({
  handleCloseModal,
  handleDeletePost,
  handleToogleEdit,
  loadingDelete,
}) => {
  return (
    <div className="flex flex-col">
      <button
        onClick={handleDeletePost}
        className="p-2 h-12 text-center text-sm border-b border-bordes font-semibold text-red-600"
        disabled={loadingDelete}
      >
        {loadingDelete ? <Spinner /> : 'Eliminar'}
      </button>
      <button
        onClick={handleToogleEdit}
        className="p-2 h-12 text-center text-sm border-b border-bordes"
      >
        Editar
      </button>
      <button className="p-2 h-12 text-center text-sm border-b border-bordes">
        Ocultar recuento de Me gusta
      </button>
      <button className="p-2 h-12 text-center text-sm border-b border-bordes">
        Ocultar Comentarios
      </button>
      <button
        onClick={handleCloseModal}
        className="p-2 h-12 text-center text-sm"
      >
        Cancelar
      </button>
    </div>
  );
};
OptionsConfigPost.propTypes = {
  handleCloseModal: propTypes.func.isRequired,
  handleDeletePost: propTypes.func.isRequired,
  handleToogleEdit: propTypes.func.isRequired,
  loadingDelete: propTypes.bool.isRequired,
};
export default OptionsConfigPost;
