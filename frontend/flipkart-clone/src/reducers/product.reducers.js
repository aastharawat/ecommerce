import { productConstants } from "../action/constants";

const initialState = {
  product: [],
  productsByPrice: {
    under5k: [],
    under10k: [],
    under15k: [],
    under20k: [],
    under30k: [],
  },
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
    case productConstants.GET_PRODUCT_BY_SLUG_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCT_BY_SLUG_REQUEST_SUCCESS:
      state = {
        ...state,
        product: action.payload.product,
        productsByPrice: action.payload.productByPrice,
        loading: false,
      };
      break;
    case productConstants.GET_PRODUCT_BY_SLUG_REQUEST_FAILURE:
      state = {
        ...state,
      };
      break;
  }
  return state;
};
