import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
} from "../actions/types";
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: data,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== data),
      };
    case POST_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === data.id ? { ...post, likes: data.likes } : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
