import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, POSTS_LOADING_TRUE } from './types';

// Get posts
export const getPosts = (page = 1, limit = 12) => async dispatch => {
  dispatch({
    type: POSTS_LOADING_TRUE,
  });

  try {
    const res = await axios.get(`/api/posts?page=${page}&limit=${limit}`);

    dispatch({
      type: GET_POSTS,
      payload: res.data.data.posts,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.message, status: err.response.status },
    });
  }
};
