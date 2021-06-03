import { ADD_TO_CART, CHANGE_QUANTITY } from "./actionTypes";

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case CHANGE_QUANTITY:
      const products = state.products;
      for (let i in products) {
        if (products[i].name === action.payload.productName) {
          products[i].quantity = action.payload.newQuantity;
          break;
        }
      }
      return {
        ...state,
        products: [...products],
      };
    default:
      return {
        ...state,
      };
  }
};
export default cartReducer;
