import { Outlet } from 'react-router-dom';
import { useReducer, useEffect, useMemo, useRef } from 'react';
import inboxContext from './inboxContext';
import { inboxReducer } from './inboxReducer';

import { customFetch } from '../../../services/customFetch';
import { inboxTypes } from '../types/inboxTypes';

const initialState = { chats: null };

const InboxProvider = () => {
  const [state, dispatch] = useReducer(inboxReducer, initialState);
  const isMounted = useRef(true);
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
    return () => {
      isMounted.current = false;
    };
  }, []);

  const contextValue = useMemo(() => ({ chats: state.chats }), [state.chats]);
  return (
    <inboxContext.Provider value={contextValue}>
      <Outlet />
    </inboxContext.Provider>
  );
};

export default InboxProvider;