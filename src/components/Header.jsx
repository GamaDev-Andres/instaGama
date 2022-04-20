import propTypes from 'prop-types';

const Header = ({ children }) => {
  return (
    <header className="h-11 bg-fondoClaro center sticky top-0 border-b border-bordes z-10">
      {children}
    </header>
  );
};
Header.propTypes = {
  children: propTypes.element.isRequired,
};
export default Header;
