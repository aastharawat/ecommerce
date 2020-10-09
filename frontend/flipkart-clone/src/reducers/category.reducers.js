import { categoryConstants } from "../action/constants";

const initialState = {
  category: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case categoryConstants.GET_CATEGORY_REQUEST_SUCCESS:
      state = {
        ...state,
        category: action.payload,
        loading: false,
      };
      break;
    case categoryConstants.GET_CATEGORY_REQUEST_FAILURE:
      state = {
        ...initialState,
      };
      break;
  }
  return state;
};
