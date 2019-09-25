import { GET_POSTS, POST_ERROR, POSTS_LOADING_TRUE } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POSTS_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
