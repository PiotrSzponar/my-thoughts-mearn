import axios from 'axios';
import { setAlert } from './alert';
import { GET_USER, USER_LOADING_TRUE, CLEAR_USER } from './types';

// Get user
export const getUser = (id, me = false) => async dispatch => {
  dispatch({
    type: USER_LOADING_TRUE,
  });

  try {
    const res = me
      ? await axios.get(`/api/users/me`)
      : await axios.get(`/api/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.message.split('\n');
    errors.forEach(error => dispatch(setAlert(error, 'fail')));

    dispatch({
      type: CLEAR_USER,
    });
  }
};

// Clear user
export const clearUser = () => dispatch => {
  dispatch({
    type: CLEAR_USER,
  });
};