import uuidv4 from 'uuid/v4';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 6000) => dispatch => {
  const id = uuidv4();
  let msgType = '';
  if (alertType === 'success') {
    msgType = 'success';
  } else if (alertType === 'fail') {
    msgType = 'error';
  } else {
    msgType = 'warning';
  }

  dispatch({
    type: SET_ALERT,
    payload: { msg, msgType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
