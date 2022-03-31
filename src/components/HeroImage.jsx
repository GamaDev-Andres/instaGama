import propTypes from 'prop-types';

const HeroImage = ({ size = 32 }) => {
  return (
    <div
      className={`aspect-square center w-[${size}] bg-fondoClaro rounded-full`}
    >
      <img
        className="rounded-full select-none object-cover w-full m-[2px]"
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
