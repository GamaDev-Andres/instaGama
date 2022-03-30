import propTypes from 'prop-types';

const HeroImage = ({ size = 32 }) => {
  return (
    <div className="aspect-square center">
      <img
        className="rounded-full select-none"
        src={`https://picsum.photos/${size}`}
        alt="img"
      />
    </div>
  );
};
HeroImage.propTypes = {
  size: propTypes.number,
};
export default HeroImage;
