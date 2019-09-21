import {
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  AUTH_LOADING_TRUE,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  loading: false,
  user: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    default:
      return state;
  }
}
