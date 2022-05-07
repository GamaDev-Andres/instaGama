import propTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import useCreateHistory from '../hooks/useCreateHistory';

const ContainerInputHistory = ({ closeModal, url }) => {
  const { handleCreateHistory: createHistory, loading } = useCreateHistory();
  const { reset, handleChange, input } = useInput();

  const handleCreateHistory = async () => {
    await createHistory({ url, descripcion: input.trim() });
    reset();
    closeModal();
  };

  return (
    <div className="z-40 w-full flex items-center p-2">
      <textarea
        value={input}
        onChange={handleChange}
        className="flex-grow placeholder:text-fondoClaro px-4 bg-transparent border-2 border-fondoClaro rounded-3xl mr-4 overflow-y-auto py-3 leading-[18px] h-[18px] max-h-[36px] text-sm box-content resize-none outline-none"
        placeholder="Añade una descripcion..."
      ></textarea>
      <button
        onClick={handleCreateHistory}
        disabled={loading}
        className="text-azul px-2 font-semibold"
      >
        Publicar
      </button>
    </div>
  );
};
ContainerInputHistory.propTypes = {
  url: propTypes.string.isRequired,
  closeModal: propTypes.func.isRequired,
};
export default ContainerInputHistory;
