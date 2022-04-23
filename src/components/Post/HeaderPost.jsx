import { Link } from 'react-router-dom';
import ButtonElipsis from './ButtonElipsis';
import HeroImage from '../HeroImage';
import useUser from '../../hooks/useUser';
import usePost from './hook/usePost';

const HeaderPost = () => {
  const { id } = useUser();
  const { autor } = usePost();
  return (
    <header className="center p-4">
      <div className=" flex flex-grow h-full">
        <HeroImage url={autor.foto} />
        <div className="flex flex-col ml-4 text-sm">
          <Link className="font-semibold" to={`/${autor.userName}`}>
            {autor.name}
          </Link>
          <p className="text-grisLetra">villavicencio-colombia</p>
        </div>
      </div>
      {autor._id === id && (
        <div className="center">
          <ButtonElipsis />
        </div>
      )}
    </header>
  );
};

export default HeaderPost;
