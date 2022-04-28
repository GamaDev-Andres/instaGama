import propTypes from 'prop-types';

const Message = ({ own = false, text }) => {
  return (
    <div
      className={`flex text-sm mb-2 ${!own ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`rounded-3xl p-4 ${
          own ? 'bg-[#efefef]' : 'border border-bordes'
        }`}
      >
        {text}
      </div>
    </div>
  );
};
Message.propTypes = {
  own: propTypes.bool,
  text: propTypes.string.isRequired,
};
export default Message;
