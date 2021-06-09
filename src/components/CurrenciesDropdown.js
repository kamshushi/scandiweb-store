import React, { Component } from "react";
import { connect } from "react-redux";
// redux
import { CHANGE_SHOW_CURRENCIES, SET_CURRENCY } from "../redux/actionTypes";
// util
import getCurrencySymbol from "../util/getCurrencySymbol";

export class CurrenciesDropdown extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //   props data
    const {
      toggleCurrencies,
      showCurrencies,
      loading,
      currencies,
      currencyIndex,
      setCurrency,
    } = this.props;
    const currenciesListMarkup =
      !loading &&
      currencies.map((currency, index) => {
        return (
          <li onClick={setCurrency} key={index} id={index}>
            {`${getCurrencySymbol(currency)} ${currency}`}
          </li>
        );
      });
    return (
      <div className="currency-container">
        <span
          onClick={() => toggleCurrencies(!showCurrencies)}
          className="currency-logo"
        >
          {!loading && getCurrencySymbol(currencies[currencyIndex])}
        </span>
        <span
          onClick={() => toggleCurrencies(!showCurrencies)}
          className="arrow-down"
        >
          &rsaquo;
        </span>
        <ul className={`currencies ${showCurrencies ? "show" : ""}`}>
          {currenciesListMarkup}
        </ul>
      </div>
    );
  }
}

//mapping state and dispatch actions to props
const mapStateToProps = (state) => {
  const { products } = state.products;
  const currencies =
    (products[0] && products[0].prices.map((price) => price.currency)) || [];
  return {
    currencies: currencies,
    currencyIndex: state.products.currencyIndex,
    currentCategory: state.products.currentCategory,
    loading: state.products.loading,
    showCurrencies: state.UI.showCurrencies,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (e) =>
      dispatch({ type: SET_CURRENCY, payload: parseInt(e.target.id) }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesDropdown);
