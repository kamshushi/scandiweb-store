import {
  SET_PRODUCTS,
  SET_LOADING,
  STOP_LOADING,
  SET_CATEGORY,
  SET_CURRENCY,
} from "./actionTypes";
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
        products: action.payload.products,
        currentCategory: "clothes",
        currencyIndex: 0,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };

    case SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };
    case SET_CURRENCY:
      return {
        ...state,
        currencyIndex: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
