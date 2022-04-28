import { inboxTypes } from '../types/inboxTypes';

export const inboxReducer = (state, action) => {
  switch (action.type) {
    case inboxTypes.SET_CHATS:
      return {
        ...state,
        chats: action.payload,
      };

    default:
      return state;
  }
};
