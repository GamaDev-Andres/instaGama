import { useEffect, useState } from 'react/cjs/react.development';
// import socketContext from '../../../contexts/socketContext/socketContext';

const ContainerInputMessage = () => {
  const [input, setInput] = useState('');
  // const { socket } = useContext(socketContext);

  const handleInput = (e) => {
    // console.log(e.target.rows);

    // if (e.target.value.includes('\n')) {
    //   console.log('salto de linea');
    // }

    setInput(e.target.value);
    // socket.emit(
    //   'mensaje',
    //   {
    //     uid: '62577f8e1e2a0ab40293f484',
    //     mensaje: 'hola desde el cliente',
    //   },
    //   (algo) => {
    //     console.log('algo salio mal');
    //   }
    // );
  };
  useEffect(() => {
    return () => {};
  }, [input]);

  return (
    <div className=" p-4 bg-fondoClaro border-t border-bordes">
      <div className="center rounded-3xl border border-bordes p-2 gap-2">
        <div className="center flex-grow">
          <textarea
            onChange={handleInput}
            value={input}
            placeholder="Envía un mensaje..."
            className=" mr-[2px] flex-grow overflow-y-auto leading-[18px] h-[18px] text-sm box-content p-2 resize-none outline-none"
          ></textarea>
        </div>
        <button className="p-2 center">
          <i className="fa-solid fa-image"></i>
        </button>
      </div>
    </div>
  );
};

export default ContainerInputMessage;
