import { profileTypes } from '../types/profileTypes';

const profileReducer = (state, action) => {
  switch (action.type) {
    case profileTypes.SET_USER:
      return action.payload;
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

    default:
      return state;
  }
};
export default profileReducer;
