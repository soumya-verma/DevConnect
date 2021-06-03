import axios from "axios";
import { setAlert } from "./alert";
import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
} from "./types";

// get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add likes
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put("/api/posts/like/" + id);

    dispatch({
      type: UPDATE_LIKES,
      data: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// remove likes
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put("/api/posts/unlike/" + id);

    dispatch({
      type: UPDATE_LIKES,
      data: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete("/api/posts/" + id);

    dispatch({
      type: DELETE_POST,
      data: id,
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: ADD_POST,
      data: res.data,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
