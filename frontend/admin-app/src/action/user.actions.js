import axios from "../helper/axios";
import { userConstants } from "./constants";

export const signUp = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.SIGNUP_REQUEST,
    });
    const res = await axios.post("http://localhost:9000/api/signUp", {
      ...user,
    });
    if (res.status === 200) {
      const { data } = res.data;

      dispatch({
        type: userConstants.SIGNUP_SUCCESS,
        payload: { data },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.SIGNUP_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
