import {
  LOGIN_LOADING_TRUE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../actions/types';

const initialState = {
  loading: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        loading: false,
      };
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
