import axiosInstance from "../helper/axios";
import { categoryConstants } from "./constants";

export const getCategories = () => {
  return async (dispatch) => {
    const res = await axiosInstance.get(
      "http://localhost:9000/api/category/fetch"
    );

    dispatch({
      type: categoryConstants.GET_CATEGORY_REQUEST,
    });
    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_CATEGORY_REQUEST_SUCCESS,
        payload: res.data.category,
      });
    } else {
      dispatch({
        type: categoryConstants.GET_CATEGORY_REQUEST_FAILURE,
        payload: res.console.error,
      });
    }
  };
};

export const addCategories = (category) => {
  return async (dispatch) => {
    const res = await axiosInstance.post(
      "http://localhost:9000/api/category/create",
      { ...category }
    );

    dispatch({
      type: categoryConstants.ADD_CATEGORY_REQUEST,
    });
    if (res.status === 201) {
      dispatch({
        type: categoryConstants.ADD_CATEGORY_REQUEST_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: categoryConstants.ADD_CATEGORY_REQUEST_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
