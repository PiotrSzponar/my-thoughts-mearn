import { SHOW_DRAWER, HIDE_DRAWER } from '../actions/types';

const initialState = {
  show: false,
};

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SHOW_DRAWER:
      return {
        ...state,
        show: true,
      };
    case HIDE_DRAWER:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}
