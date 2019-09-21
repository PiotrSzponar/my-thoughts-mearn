import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import layout from './layout';

export default combineReducers({
  layout,
  alert,
  auth,
});
