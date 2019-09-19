import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_RESET,
  REGISTER_LOADING_TRUE,
} from './types';
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

  dispatch({
    type: REGISTER_LOADING_TRUE,
  });

  try {
    await axios.post('/api/users/signup', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
    });
  } catch (err) {
    const errors = err.response.data.message.split('\n');
    errors.forEach(error => dispatch(setAlert(error, 'fail')));

    dispatch({
      type: REGISTER_RESET,
    });
  }
};

export const signupReset = () => dispatch => {
  dispatch({
    type: REGISTER_RESET,
  });
};
