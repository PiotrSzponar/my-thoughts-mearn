import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from './alert';

// Register User
export const signup = ({
  name,
  email,
  password,
  passwordConfirm,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password, passwordConfirm });

  try {
    const res = await axios.post('/api/users/signup', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    const errors = err.response.data.message.split('\n');
    errors.forEach(error => dispatch(setAlert(error, 'fail')));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
