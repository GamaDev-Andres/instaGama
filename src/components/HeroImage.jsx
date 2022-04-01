import propTypes from 'prop-types';

const HeroImage = ({ size = 32 }) => {
  const tamaño = `w-[${size}px]`;
  return (
    <div
      className={`aspect-square center ${tamaño} bg-fondoClaro rounded-full flex-shrink-0`}
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
