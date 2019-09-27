import { GET_USER, USER_LOADING_TRUE, CLEAR_USER } from '../actions/types';

const initialState = {
  user: null,
  loading: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case USER_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    default:
      return state;
  }
}
