import { SET_PRODUCTS, SET_LOADING, STOP_LOADING } from "./actionTypes";
const initialState = {
  products: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        name: action.payload.name,
        products: action.payload.products,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
