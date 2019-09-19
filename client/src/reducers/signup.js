import {
  REGISTER_LOADING_TRUE,
  REGISTER_SUCCESS,
  REGISTER_RESET,
} from '../actions/types';

const initialState = {
  userCreated: false,
  loading: false,
};

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case REGISTER_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userCreated: true,
      };
    case REGISTER_RESET:
      return {
        ...state,
        loading: false,
        userCreated: false,
      };
    default:
      return state;
  }
}
