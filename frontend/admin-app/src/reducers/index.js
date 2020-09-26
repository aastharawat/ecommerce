import authReducer from "./auth.reducers";
import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";
import orderReducer from "./order.reducers";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
});

export default rootReducer;
