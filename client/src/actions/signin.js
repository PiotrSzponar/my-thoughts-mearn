import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_LOADING_TRUE } from './types';
import { setAlert } from './alert';
import { loadUser } from './auth';

// Login User
export const signin = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  dispatch({
    type: LOGIN_LOADING_TRUE,
  });

  try {
    const res = await axios.post('/api/users/signin', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.message.split('\n');
    errors.forEach(error => {
      if (error !== 'Not verified') {
        dispatch(setAlert(error, 'fail'));
      } else {
        dispatch(setAlert(error, 'warning', 10000));
      }
    });

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
