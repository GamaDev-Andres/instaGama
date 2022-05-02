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
    case inboxTypes.DELETE_CHAT:
      return {
        ...state,
        chats: state.chats.filter((chat) => chat._id !== action.payload),
      };
    case inboxTypes.DELETE_MESSAGE:
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.with.id === action.payload.idChat
            ? {
                ...chat,
                mensajes: chat.mensajes.map((mensaje) =>
                  mensaje._id === action.payload.mensaje._id
                    ? action.payload.mensaje
                    : mensaje
                ),
              }
            : chat
        ),
      };

    default:
      return state;
  }
};
