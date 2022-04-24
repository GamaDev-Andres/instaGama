import { profileTypes } from '../types/profileTypes';

const profileReducer = (state, action) => {
  switch (action.type) {
    case profileTypes.SET_USER:
      return action.payload;
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
