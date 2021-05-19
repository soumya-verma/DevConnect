import { v4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

// to dispatch more than one action type from this function
// thunk middleware
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = v4();
    dispatch({
      type: SET_ALERT,
      data: { msg, alertType, id },
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          data: id,
        }),
      timeout
    );
  };
