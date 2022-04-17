import socketContext from './socketContext';
import { io } from 'socket.io-client';
import propTypes from 'prop-types';
import { useEffect } from 'react';

const socket = io(import.meta.env.VITE_URL_SERVER, {
  extraHeaders: {
    'x-token': localStorage.getItem('token'),
  },
});

const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('conectado con el servidor');
      socket.on('mensaje', (mensaje) => {
        console.log(mensaje);
      });
    });
  }, []);

  return (
    <socketContext.Provider value={{ io, socket }}>
      {children}
    </socketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: propTypes.any,
};
export default SocketProvider;
