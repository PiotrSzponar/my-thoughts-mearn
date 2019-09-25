import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import layout from './layout';
import post from './post';

export default combineReducers({
  layout,
  alert,
  auth,
  post,
});
