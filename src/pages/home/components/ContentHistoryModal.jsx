import propTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import HeroImage from '../../../components/HeroImage';
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
const ContentHistoryModal = ({ data, url, isCreating, children }) => {
  console.log(data, url);
  console.log(isCreating);
  return !isCreating ? (
    <Carousel
      autoPlay={true}
      autoPlaySpeed={5000}
      swipeable={true}
      pauseOnHover={true}
      showDots={true}
      dotListClass="grid grid-cols-3 top-0 bottom-unset bg-transparent justify-between gap-[2px]"
      renderDotsOutside={true}
      sliderClass="h-full center"
      itemClass="h-full center"
      customDot={<CustomDot arr={data.histories} />}
      containerClass="w-full h-full"
      responsive={responsive}
    >
      {data.histories.map((history) => (
        <div
          key={history._id}
          className="mx-auto bg-negro z-40 relative w-full max-w-md h-full max-h-[90vh] flex flex-col justify-between my-2"
        >
          <div className="z-[40] flex items-center gap-4 ml-4 mt-2">
            <HeroImage url={data.autor.foto} />
            <Link
              to={`/${history.autor.userName}`}
              className="font-sans text-sm"
            >
              {history.autor.name}
            </Link>
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 center">
            <img
              className="w-full sm:max-h-[90vh] object-cover rounded-none sm:rounded-2xl"
              src={history.url}
            />
          </div>
          <p className="z-[40] px-4 py-2 font-sans text-sm">
            {history.descripcion}
          </p>
        </div>
      ))}
    </Carousel>
  ) : (
    <div className="bg-negro z-40 relative w-full max-w-md max-h-[90vh] h-full flex items-end">
      <div className="absolute top-0 bottom-0 left-0 right-0 center">
        <img
          className="w-full sm:max-h-[90vh] object-cover rounded-none sm:rounded-2xl"
          src={url}
        />
      </div>
      {children}
    </div>
  );
};
ContentHistoryModal.propTypes = {
  data: propTypes.object.isRequired,
  url: propTypes.string.isRequired,
  isCreating: propTypes.bool,
  children: propTypes.any,
};
export default ContentHistoryModal;
