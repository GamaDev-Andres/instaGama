import { profileTypes } from '../types/profileTypes';

const profileReducer = (state, action) => {
  switch (action.type) {
    case profileTypes.SET_USER:
      return action.payload;
    case profileTypes.TOOGLE_FOLLOW:
      return {
        ...state,
        followers: state.followers.includes(action.payload)
          ? state.followers.filter((el) => el !== action.payload)
          : [...state.followers, action.payload],
      };
    case profileTypes.SET_POST:
      return {
        ...state,
        posts: state.posts.map((el) =>
          el._id === action.payload._id ? action.payload : el
        ),
      };
    case profileTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((el) => el._id !== action.payload),
      };
    case profileTypes.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((el) =>
          el._id === action.payload.id
            ? { ...el, descripcion: action.payload.descripcion }
            : el
        ),
      };
    case profileTypes.UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
export default profileReducer;
