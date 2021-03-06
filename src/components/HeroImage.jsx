import propTypes from 'prop-types';

const HeroImage = ({ className = 'w-[32px]', url }) => {
  return (
    <div className={`aspect-square  bg-fondoClaro rounded-full center`}>
      <img
        className={`rounded-full select-none object-cover aspect-square m-[2px] ${className}`}
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
