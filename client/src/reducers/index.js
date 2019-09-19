import { combineReducers } from 'redux';
import alert from './alert';
import signup from './signup';
import signin from './signin';
import auth from './auth';

export default combineReducers({
  alert,
  signup,
  signin,
  auth,
});
