import propTypes from 'prop-types';
import ReactDom from 'react-dom';
import { useEffect } from 'react/cjs/react.development';

const ModalHistory = ({ children, closeModal }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDom.createPortal(
    <div className="center fixed top-0 bottom-0 left-0 right-0 bg-negro z-50 text-fondoClaro">
      <header className="flex justify-between items-center w-full fixed top-0 p-4 z-50">
        <h1 className="font-bold text-2xl">InstaGama</h1>
        <button onClick={closeModal} className="p-2">
          X
        </button>
      </header>
      {children}
    </div>,
    document.querySelector('#root-modal')
  );
};
ModalHistory.propTypes = {
  children: propTypes.any.isRequired,
  closeModal: propTypes.func.isRequired,
};
export default ModalHistory;
