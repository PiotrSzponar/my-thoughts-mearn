import { SHOW_DRAWER, HIDE_DRAWER } from './types';

// Show Drawer
export const showDrawer = () => async dispatch => {
  dispatch({
    type: SHOW_DRAWER,
  });
};

// Hide Drawer
export const hideDrawer = () => async dispatch => {
  dispatch({
    type: HIDE_DRAWER,
  });
};
