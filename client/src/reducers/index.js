import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import layout from './layout';
import post from './post';
import user from './user';

export default combineReducers({
  layout,
  alert,
  auth,
  post,
  user,
});
