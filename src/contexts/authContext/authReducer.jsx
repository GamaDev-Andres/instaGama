import { authTypes } from '../../types/authTypes';

const authReducer = (state, action) => {
  switch (action.type) {
    case authTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
