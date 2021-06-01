import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, UPDATE_PROFILE, PROFILE_ERROR } from "./types";

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
