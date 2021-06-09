import { CHANGE_SHOW_CURRENCIES, CHANGE_SHOW_MINICART } from "../actionTypes";

const initialState = {
  showCurrencies: false,
  showMiniCart: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SHOW_CURRENCIES:
      return {
        ...state,
        showCurrencies: action.payload,
      };
    case CHANGE_SHOW_MINICART:
      return {
        ...state,
        showMiniCart: action.payload,
      };

    default:
      return state;
  }
};

export default uiReducer;
