import socketContext from './socketContext';
import { io } from 'socket.io-client';
import propTypes from 'prop-types';
import { useEffect } from 'react';
import useUser from '../../hooks/useUser';

const socket = io(import.meta.env.VITE_URL_SERVER);

const SocketProvider = ({ children }) => {
  const { id } = useUser();
  useEffect(() => {
    socket.emit('validado', { token: localStorage.getItem('token'), id });
    return () => {
      socket.emit('logout', id);
    };
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
