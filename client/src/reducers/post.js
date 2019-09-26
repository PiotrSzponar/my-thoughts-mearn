import {
  GET_POST,
  GET_POSTS,
  POSTS_LOADING_TRUE,
  EMPTY_POSTS,
  CLEAR_POSTS,
  UPDATE_POST_LIKES,
  UPDATE_POSTS_LIKES,
  POSTS_ERROR,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  noData: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        loading: false,
        noData: false,
      };
    case POSTS_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case EMPTY_POSTS:
      return {
        ...state,
        loading: false,
        noData: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...payload],
        loading: false,
        noData: false,
      };
    case GET_POST:
      return {
        ...state,
        post: { ...payload },
        loading: false,
      };
    case UPDATE_POST_LIKES:
      return {
        ...state,
        post:
          state.post._id === payload.id
            ? { ...state.post, likes: payload.likes }
            : state.post,
      };
    case UPDATE_POSTS_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post,
        ),
      };
    case POSTS_ERROR:
      return {
        ...state,
        posts: [],
        post: null,
        loading: false,
        noData: false,
      };
    default:
      return state;
  }
}
