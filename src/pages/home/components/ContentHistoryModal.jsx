import propTypes from 'prop-types';

const ContentHistoryModal = ({ isCreating = false, autor, url, children }) => {
  console.log(autor, url);
  return (
    <div className="bg-red-400 z-40 relative w-screen h-screen flex items-end">
      <div className="absolute w-full h-full">
        <img className="w-full h-full object-cover" src={url} />
      </div>
      {isCreating && { children }}
    </div>
  );
};
ContentHistoryModal.propTypes = {
  autor: propTypes.object.isRequired,
  children: propTypes.any.isRequired,
  url: propTypes.string.isRequired,
  isCreating: propTypes.bool,
};
export default ContentHistoryModal;
