import { Outlet } from 'react-router-dom';
import { useReducer, useEffect, useMemo, useRef } from 'react';
import inboxContext from './inboxContext';
import { inboxReducer } from './inboxReducer';

import { customFetch } from '../../../services/customFetch';
import { inboxTypes } from '../types/inboxTypes';
import { useCallback, useContext } from 'react/cjs/react.development';
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
    socket.on('chat', addChatState);
    socket.on('deleteMensaje', deleteMessageState);

    return () => {
      isMounted.current = false;
    };
  }, []);

  const deleteMessageState = useCallback(({ mensaje, idChat }) => {
    dispatch({ type: inboxTypes.DELETE_MESSAGE, payload: { mensaje, idChat } });
  });
  const addChatState = useCallback((chat) => {
    dispatch({ type: inboxTypes.ADD_CHAT, payload: chat });
  });
  const addMessageState = useCallback((mensaje, idChat) => {
    dispatch({ type: inboxTypes.ADD_MESSAGE, payload: { idChat, mensaje } });
  });
  const deleteChatState = useCallback((idChat) => {
    dispatch({ type: inboxTypes.DELETE_CHAT, payload: idChat });
  });
  const contextValue = useMemo(
    () => ({
      chats: state.chats,
      addMessageState,
      deleteChatState,
      deleteMessageState,
    }),
    [state.chats, addMessageState, deleteChatState, deleteMessageState]
  );
  return (
    <inboxContext.Provider value={contextValue}>
      <Outlet />
    </inboxContext.Provider>
  );
};

export default InboxProvider;
