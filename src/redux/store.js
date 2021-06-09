import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import productReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import uiReducer from "./reducers/uiReducer";
const middleware = [thunk];
const initialState = {};

const reducers = combineReducers({
  products: productReducer,
  cart: cartReducer,
  UI: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
