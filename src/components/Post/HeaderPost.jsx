import { Link } from 'react-router-dom';
import ButtonElipsis from './ButtonElipsis';
import HeroImage from '../HeroImage';
import propTypes from 'prop-types';

const HeaderPost = ({ autor }) => {
  return (
    <header className="center p-4">
      <div className=" flex flex-grow h-full">
        <HeroImage url={autor.foto} />
        <div className="flex flex-col ml-4 text-sm">
          <Link className="font-semibold" to="/">
            {autor.name}
          </Link>
          <p className="text-grisLetra">villavicencio-colombia</p>
        </div>
      </div>
      <div className="center">
        <ButtonElipsis />
      </div>
    </header>
  );
};
HeaderPost.propTypes = {
  autor: propTypes.object.isRequired,
};
export default HeaderPost;
