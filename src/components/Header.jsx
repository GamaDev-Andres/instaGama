import propTypes from 'prop-types';

const Header = ({ text = 'InstaGama' }) => {
  return (
    <header className="h-11 bg-fondoClaro center sticky top-0 border-b border-bordes">
      <h1 className="font-black italic text-xl">{text}</h1>
    </header>
  );
};
Header.propTypes = {
  text: propTypes.string,
};
export default Header;
