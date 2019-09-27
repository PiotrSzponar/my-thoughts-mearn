import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POST,
  GET_POSTS,
  POSTS_LOADING_TRUE,
  EMPTY_POSTS,
  CLEAR_POSTS,
  UPDATE_POST_LIKES,
  UPDATE_POSTS_LIKES,
  POSTS_ERROR,
} from './types';

// Get post
export const getPost = id => async dispatch => {
  dispatch({
    type: POSTS_LOADING_TRUE,
  });

  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data.data.post,
    });
  } catch (err) {
    const errors = err.response.data.message.split('\n');
    errors.forEach(error => dispatch(setAlert(error, 'fail')));

    dispatch({
      type: POSTS_ERROR,
    });
  }
};

// Get posts
export const getPosts = (page = 1, sort = '', limit = 9) => async dispatch => {
  dispatch({
    type: POSTS_LOADING_TRUE,
  });

  try {
    const res = await axios.get(
      `/api/posts?page=${page}&limit=${limit}&sort=${sort}`,
    );
    if (res.data.data.posts.length === 0) {
      dispatch({
        type: EMPTY_POSTS,
      });
    } else {
      dispatch({
        type: GET_POSTS,
        payload: res.data.data.posts,
      });
    }
  } catch (err) {
    const errors = err.response.data.message.split('\n');
    errors.forEach(error => dispatch(setAlert(error, 'fail')));

    dispatch({
      type: POSTS_ERROR,
    });
  }
};

// Clear post wall
export const clearPosts = () => dispatch => {
  dispatch({
    type: CLEAR_POSTS,
  });
};

// Like single post
export const likePost = id => async dispatch => {
  try {
    const res = await axios.patch(`/api/posts/${id}/like`);

    dispatch({
      type: UPDATE_POST_LIKES,
      payload: { id, likes: res.data.data.likes },
    });
  } catch (err) {
    const errors = err.response.data.message.split('\n');
    errors.forEach(error => dispatch(setAlert(error, 'fail')));
  }
};

// Like wall posts
export const likePosts = id => async dispatch => {
  try {
    const res = await axios.patch(`/api/posts/${id}/like`);

    dispatch({
      type: UPDATE_POSTS_LIKES,
      payload: { id, likes: res.data.data.likes },
    });
  } catch (err) {
    const errors = err.response.data.message.split('\n');
    errors.forEach(error => dispatch(setAlert(error, 'fail')));
  }
};
