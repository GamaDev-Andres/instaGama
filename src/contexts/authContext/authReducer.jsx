import { authTypes } from '../../types/authTypes';

const authReducer = (state, action) => {
  switch (action.type) {
    case authTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case authTypes.DELETE_POST:
      return {
        ...state,
        user: {
          ...state.user,
          posts: state.user.posts.filter((el) => el._id !== action.payload),
        },
      };
    case authTypes.SET_POST:
      return {
        ...state,
        user: {
          ...state.user,
          posts: state.user.posts.map((el) =>
            el._id === action.payload._id ? action.payload : el
          ),
        },
      };
    case authTypes.UPDATE_POST:
      return {
        ...state,
        user: {
          ...state.user,
          posts: state.user.posts.map((el) =>
            el._id === action.payload.id
              ? { ...el, descripcion: action.payload.descripcion }
              : el
          ),
        },
      };
    case authTypes.LOG_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export default authReducer;
