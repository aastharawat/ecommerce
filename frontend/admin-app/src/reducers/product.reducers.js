import { productConstants } from "../action/constants";

const initialState = {
  product: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case productConstants.GET_PRODUCT_REQUEST_SUCCESS:
      state = {
        ...state,
        product: action.payload.product,
        loading: false,
      };
      break;
    case productConstants.GET_PRODUCT_REQUEST_FAILURE:
      state = {
        ...initialState,
      };
      break;
  }
  return state;
};
