import axiosInstance from "../helper/axios";
import { productConstants } from "./constants";

export const getProducts = () => {
  return async (dispatch) => {
    const res = await axiosInstance.get(
      "http://localhost:9000/api/product/fetch"
    );
    dispatch({
      type: productConstants.GET_PRODUCT_REQUEST,
    });
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCT_REQUEST_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: productConstants.GET_PRODUCT_REQUEST_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

export const addProducts = (product) => {
  return async (dispatch) => {
    const res = await axiosInstance.post(
      "http://localhost:9000/api/product/create",
      { ...product }
    );

    dispatch({
      type: productConstants.ADD_PRODUCT_REQUEST,
    });
    if (res.status === 201) {
      dispatch({
        type: productConstants.ADD_PRODUCT_REQUEST_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: productConstants.ADD_PRODUCT_REQUEST_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
