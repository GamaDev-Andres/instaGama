import { authTypes } from '../../types/authTypes';

const authReducer = (state, action) => {
  switch (action.type) {
    case authTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case authTypes.TOOGLE_FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.includes(action.payload)
            ? state.user.following.filter((el) => el !== action.payload)
            : [...state.user.following, action.payload],
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
