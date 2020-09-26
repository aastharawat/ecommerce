import { categoryConstants } from "../action/constants";

const initialState = {
  category: [],
  authenticate: false,
  authenticating: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORY_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;

    case categoryConstants.GET_CATEGORY_REQUEST_SUCCESS:
      state = {
        ...state,
        category: action.payload.category,
        authenticate: true,
        authenticating: false,
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
