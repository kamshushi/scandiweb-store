import {
  SET_PRODUCTS,
  SET_LOADING,
  STOP_LOADING,
  SET_CATEGORY,
  SET_CURRENCY,
} from "./actionTypes";
const initialState = {
  products: [],
  currencyIndex: 0,
  currentCategory: "",
  loading: true,
};
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_PRODUCTS:
      let products = action.payload.products;
      const productsWithId = products.map((item, index) => {
        return {
          ...item,
          id: index + 1,
        };
      });
      const allCategories = products.map((product) => product.category);
      const uniqueCategories = [...new Set(allCategories)];
      return {
        ...state,
        products: productsWithId,
        currentCategory: uniqueCategories[0],
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
export default productsReducer;
