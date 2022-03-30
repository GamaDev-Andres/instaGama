import { Link } from 'react-router-dom';

const NavBarPhone = () => {
  return (
    <nav className="center fixed bottom-0 left-0 w-screen bg-fondoClaro h-11 border-t border-bordes">
      <div className="flex w-full h-full">
        <Link className="center flex-grow " to="/">
          <i className="fa-solid fa-house w-6 h-6 text-xl center"></i>
        </Link>
        <Link className="center flex-grow " to="/search">
          <i className="fa-solid fa-magnifying-glass w-6 h-6 text-xl center"></i>
        </Link>
        <Link className="center flex-grow " to="/inbox">
          <i className="fa-solid fa-message w-6 h-6 text-xl center"></i>{' '}
        </Link>
        <button className="center flex-grow ">
          <i className="fa-solid fa-camera w-6 h-6 text-xl center"></i>
        </button>
        <Link className="center flex-grow " to="/profile">
          <i className="fa-solid fa-user w-6 h-6 text-xl center"></i>
        </Link>
      </div>
    </nav>
  );
};

export default NavBarPhone;
