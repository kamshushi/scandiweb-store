import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import productReducer from "./productsReducer";
import cartReducer from "./cartReducer";
const middleware = [thunk];
const initialState = {};

const reducers = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
