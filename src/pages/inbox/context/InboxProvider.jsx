import { Outlet } from 'react-router-dom';
import { useReducer, useEffect, useMemo, useRef } from 'react';
import inboxContext from './inboxContext';
import { inboxReducer } from './inboxReducer';

import { customFetch } from '../../../services/customFetch';
import { inboxTypes } from '../types/inboxTypes';
import { useContext } from 'react/cjs/react.development';
import socketContext from '../../../contexts/socketContext/socketContext';

const initialState = { chats: null };

const InboxProvider = () => {
  const [state, dispatch] = useReducer(inboxReducer, initialState);
  const isMounted = useRef(true);
  const { socket } = useContext(socketContext);

  useEffect(() => {
    const urlPeticionChats =
      import.meta.env.VITE_URL_SERVER + '/api/inbox/chats';
    customFetch(urlPeticionChats, 'GET')
      .then((res) => {
        if (res.msg) {
          throw new Error(res.msg);
        }
        if (isMounted.current) {
          dispatch({ type: inboxTypes.SET_CHATS, payload: res.chats });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    socket.on('mensaje', (mensaje) => {
      addMessageState(mensaje, mensaje.autor);
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const addMessageState = (mensaje, idChat) => {
    dispatch({ type: inboxTypes.ADD_MESSAGE, payload: { idChat, mensaje } });
  };
  const contextValue = useMemo(
    () => ({ chats: state.chats, addMessageState }),
    [state.chats, addMessageState]
  );
  return (
    <inboxContext.Provider value={contextValue}>
      <Outlet />
    </inboxContext.Provider>
  );
};

export default InboxProvider;
