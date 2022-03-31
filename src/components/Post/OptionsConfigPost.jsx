import propTypes from 'prop-types';

const OptionsConfigPost = ({ handleCloseModal }) => {
  return (
    <div className="flex flex-col  ">
      <button className="p-2 h-12 text-center text-sm border-b border-bordes font-semibold text-red-600">
        Eliminar
      </button>
      <button className="p-2 h-12 text-center text-sm border-b border-bordes">
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
};
export default OptionsConfigPost;
