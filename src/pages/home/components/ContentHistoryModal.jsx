import propTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CustomDot from './CustomDot';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
const ContentHistoryModal = ({ autor, url, isCreating, children }) => {
  console.log(autor, url);
  console.log(isCreating);
  return !isCreating ? (
    <Carousel
      autoPlay={true}
      autoPlaySpeed={5000}
      swipeable={true}
      pauseOnHover={true}
      showDots={true}
      dotListClass="grid grid-cols-3 top-0 bg-transparent justify-between gap-[2px]"
      renderDotsOutside={true}
      customDot={<CustomDot arr={['', '', '']} />}
      containerClass="w-full h-full"
      responsive={responsive}
    >
      <div className="mx-auto bg-negro z-40 relative w-full max-w-lg h-full flex items-end my-2">
        <div className="absolute w-full h-full center">
          <img className="w-full object-cover" src={url} />
        </div>
        {children}
      </div>
      <div className="mx-auto bg-negro z-40 relative w-full max-w-lg   h-full flex items-end my-2">
        <div className="absolute w-full h-full center">
          <img className="w-full object-cover" src={url} />
        </div>
        {children}
      </div>
      <div className="mx-auto bg-negro z-40 relative w-full max-w-lg   h-full flex items-end my-2">
        <div className="absolute w-full h-full center">
          <img className="w-full object-cover" src={url} />
        </div>
        {children}
      </div>
    </Carousel>
  ) : (
    <div className="bg-negro z-40 relative w-full max-w-lg   h-full flex items-end">
      <div className="absolute w-full h-full center">
        <img className="w-full object-cover" src={url} />
      </div>
      {children}
    </div>
  );
};
ContentHistoryModal.propTypes = {
  autor: propTypes.object.isRequired,
  url: propTypes.string.isRequired,
  isCreating: propTypes.bool,
  children: propTypes.any,
};
export default ContentHistoryModal;
