import { ADD_TO_CART, CHANGE_QUANTITY, REMOVE_FROM_CART } from "../actionTypes";
// util
import isEquivalentObjects from "../../util/isEquivalentObjects";
const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;
      const productsInCart = state.products;
      // Checking if the new product exists with same attributes so we increment the existing product quantity in cart
      for (var i = 0; i < productsInCart.length; i++) {
        if (
          isEquivalentObjects(
            product.userSelection,
            productsInCart[i].userSelection
          ) &&
          product.name === productsInCart[i].name
        ) {
          productsInCart[i].quantity += 1;
          return {
            ...state,
          };
        }
      }
      const productWithDate = {
        ...product,
        timeAdded: new Date().valueOf(),
      };
      return {
        ...state,
        products: [...state.products, productWithDate],
      };
    case CHANGE_QUANTITY:
      const products = state.products;
      for (let i in products) {
        if (products[i].timeAdded === action.payload.product.timeAdded) {
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
        return product.timeAdded !== action.payload.timeAdded;
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
