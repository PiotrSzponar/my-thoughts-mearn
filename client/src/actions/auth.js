import axios from 'axios';
import { USER_LOADED, AUTH_ERROR, LOGOUT, AUTH_LOADING_TRUE } from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  dispatch({
    type: AUTH_LOADING_TRUE,
  });

  try {
    const res = await axios.get('/api/users/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data.user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
