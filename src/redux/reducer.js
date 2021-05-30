import { SET_PRODUCTS } from "./actionTypes";
const initialState = {
  products: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case "YO":
      return {
        ...state,
        yo: "yo",
      };

    default:
      return state;
  }
};
export default reducer;
