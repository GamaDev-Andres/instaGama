import ReactDOM from 'react-dom';
import { useEffect } from 'react/cjs/react.development';

const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      onClick={closeModal}
      className="center fixed top-0 bottom-0 left-0 right-0 bg-negro bg-opacity-60 z-50 text-negro"
    >
      <div
        className="rounded-2xl w-72 sm:w-[400px] bg-fondoClaro"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.querySelector('#root-modal')
  );
};

export default Modal;
