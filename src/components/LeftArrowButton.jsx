import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const LeftArrowButton = ({ path }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path);
  };
  return (
    <button
      onClick={handleNavigate}
      className="center text-2xl absolute top-0 left-0 px-4 bottom-0"
    >
      <i className="fa-solid fa-angle-left"></i>
    </button>
  );
};
LeftArrowButton.propTypes = {
  path: propTypes.string.isRequired,
};

export default LeftArrowButton;
