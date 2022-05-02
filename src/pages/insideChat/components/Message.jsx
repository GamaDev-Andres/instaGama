import propTypes from 'prop-types';
import ButtonElipsisMessage from './ButtonElipsisMessage';

const Message = ({ own = false, data }) => {
  const { mensaje, _id: idMensaje, mode } = data;
  return (
    <div
      className={`w-full flex justify-end ${
        !own ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {own && mode !== 'off' && (
        <ButtonElipsisMessage mensaje={mensaje} idMensaje={idMensaje} />
      )}
      <div className="max-w-[75%] md:max-w-[50%]  flex text-sm mb-2">
        <div
          className={`rounded-3xl p-4 ${
            own ? 'bg-[#efefef]' : 'border border-bordes'
          } ${mode === 'off' ? 'italic' : ''}`}
        >
          {mensaje}
        </div>
      </div>
    </div>
  );
};
Message.propTypes = {
  own: propTypes.bool,
  data: propTypes.object.isRequired,
};
export default Message;
