import propTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    slidesToSlide: 3,
  },
};
const CarouselHistories = ({ children }) => {
  return (
    <Carousel
      autoPlay={false}
      autoPlaySpeed={5000}
      swipeable={true}
      containerClass="w-full h-full"
      removeArrowOnDeviceType={['tablet', 'mobile']}
      cust
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
};
CarouselHistories.propTypes = {
  children: propTypes.any.isRequired,
};
export default CarouselHistories;
