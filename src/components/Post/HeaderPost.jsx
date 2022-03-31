import { Link } from 'react-router-dom';
import ButtonElipsis from './ButtonElipsis';
import HeroImage from '../HeroImage';

const HeaderPost = () => {
  return (
    <header className="center p-4">
      <div className=" flex flex-grow h-full">
        <HeroImage />
        <div className="flex flex-col ml-4 text-sm">
          <Link className="font-semibold" to="/">
            andres gama
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

export default HeaderPost;
