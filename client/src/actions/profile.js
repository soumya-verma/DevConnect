import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_REPOS,
} from "./types";

// get current users' profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/user/" + userId);

    dispatch({
      type: GET_PROFILE,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/github/" + username);

    dispatch({
      type: GET_REPOS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        data: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      // for redirecting
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        data: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      data: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    // for redirecting
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      data: res.data,
    });

    dispatch(setAlert("Education Added", "success"));

    // for redirecting
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete experiences
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/profile/experience/" + id);

    dispatch({
      type: UPDATE_PROFILE,
      data: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete educations
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/profile/education/" + id);

    dispatch({
      type: UPDATE_PROFILE,
      data: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to delete your account? This cannot be undone!"
    )
  ) {
    try {
      const res = await axios.delete("/api/profile");

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: DELETE_ACCOUNT,
      });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        data: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
