import { ADD_TO_CART, CHANGE_QUANTITY, REMOVE_FROM_CART } from "./actionTypes";

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
        if (products[i].id === action.payload.product.id) {
          products[i].quantity = action.payload.newQuantity;
          break;
        }
      }
      return {
        ...state,
        products: [...products],
      };
    case REMOVE_FROM_CART:
      const newProducts = state.products.filter((product) => {
        return product.id !== action.payload.id;
      });
      return {
        ...state,
        products: newProducts,
      };
    default:
      return {
        ...state,
      };
  }
};
export default cartReducer;
