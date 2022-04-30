import { inboxTypes } from '../types/inboxTypes';

export const inboxReducer = (state, action) => {
  switch (action.type) {
    case inboxTypes.SET_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case inboxTypes.ADD_MESSAGE:
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.with.id === action.payload.idChat
            ? { ...chat, mensajes: [...chat.mensajes, action.payload.mensaje] }
            : chat
        ),
      };
    case inboxTypes.ADD_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };

    default:
      return state;
  }
};
