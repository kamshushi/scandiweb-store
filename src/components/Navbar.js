import React, { Component } from "react";
import styled from "styled-components";
import "../styles/navbar.css";
//icons
import StoreLogo from "../icons/Brand icon.svg";
import ArrowDown from "../icons/arrow down.svg";
import CartLogo from "../icons/Cart.svg";
//util
import { getCurrencySymbol } from "../util/currencySymbols";
//redux
import { connect } from "react-redux";
import store from "../redux/store";
import { SET_CATEGORY, SET_CURRENCY } from "../redux/actionTypes";

const setCategory = (e) => {
  store.dispatch({ type: SET_CATEGORY, payload: e.target.id });
};
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrencies: false,
    };
  }
  hideCurrencies = (e) => {
    if (!e.target.matches(".currency-logo")) {
      this.setState({ showCurrencies: false });
    }
  };
  componentDidMount() {
    window.addEventListener("click", this.hideCurrencies);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.hideCurrencies);
  }
  render() {
    const toggleCurrencies = () => {
      this.setState({
        showCurrencies: !this.state.showCurrencies,
      });
    };
    const {
      categories,
      currencies,
      setCurrency,
      currencyIndex,
      currentCategory,
    } = this.props;
    return (
      <nav className="nav-container">
        <ul className="categories">
          {categories &&
            categories.map((category, index) => {
              return (
                <li
                  className={currentCategory === category ? "active" : ""}
                  key={index}
                  id={category}
                  onClick={setCategory}
                >
                  {category}
                </li>
              );
            })}
        </ul>
        <div className="logo">
          <img src={StoreLogo} alt="logo" />
        </div>
        <div className="actions">
          <div onClick={toggleCurrencies} className="currency-container">
            {/* <img className="currency-logo" src={CurrencyLogo} alt="currency" /> */}
            <span className="currency-logo">
              {currencies && getCurrencySymbol(currencies[currencyIndex])}
            </span>
            <img src={ArrowDown} alt="arrow" />
            <ul className={`currencies ${this.state.showCurrencies && "show"}`}>
              {currencies &&
                currencies.map((currency, index) => {
                  return (
                    <li onClick={setCurrency} key={index} id={index}>
                      {`${getCurrencySymbol(currency)} ${currency}`}
                    </li>
                  );
                })}
            </ul>
          </div>
          <img className="cart" src={CartLogo} alt="cart" />
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  const currencies =
    state.products && state.products[0].prices.map((price) => price.currency);
  const allCategories =
    state.products && state.products.map((product) => product.category);
  const uniqueCategories = [...new Set(allCategories)];
  return {
    currencies: currencies,
    categories: uniqueCategories,
    currencyIndex: state.currency,
    currentCategory: state.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (e) => dispatch({ type: SET_CURRENCY, payload: e.target.id }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
