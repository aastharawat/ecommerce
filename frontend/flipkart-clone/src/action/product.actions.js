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

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axiosInstance.get(
      `http://localhost:9000/api/getProduct/${slug}`
    );

    console.log(res, "Aastha");
    dispatch({
      type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST,
    });
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
