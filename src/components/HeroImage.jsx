import propTypes from 'prop-types';

const HeroImage = ({ className = 'w-[32px]', url }) => {
  // const tamaño = `w-[${size}px]`;
  return (
    <div
      className={`aspect-square center ${className} bg-fondoClaro rounded-full flex-shrink-0`}
    >
      <img
        className="rounded-full select-none object-cover w-full m-[2px]"
        src={url || 'https://picsum.photos/500'}
        alt="img"
      />
    </div>
  );
};
HeroImage.propTypes = {
  className: propTypes.string,
  url: propTypes.string,
};
export default HeroImage;
