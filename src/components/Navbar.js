import React, { Component } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";
//icons
import StoreLogo from "../icons/Brand icon.svg";
import ArrowDown from "../icons/arrow down.svg";
import CartLogo from "../icons/Cart.svg";
//util
import getCurrencySymbol from "../util/getCurrencySymbol";
//redux
import { connect } from "react-redux";
import store from "../redux/store";
import { SET_CATEGORY, SET_CURRENCY } from "../redux/actionTypes";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrencies: false,
      showMiniCart: false,
    };
  }
  hideCurrencies = (e) => {
    if (!e.target.matches(".currency-logo, .arrow-down")) {
      this.setState({ showCurrencies: false });
    }
  };
  toggleCurrencies = () => {
    this.setState({
      showCurrencies: !this.state.showCurrencies,
    });
  };
  //Set current category
  setCategory = (e) => {
    store.dispatch({ type: SET_CATEGORY, payload: e.target.id });
  };
  componentDidMount() {
    window.addEventListener("click", this.hideCurrencies);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.hideCurrencies);
  }
  render() {
    const {
      categories,
      currencies,
      setCurrency,
      currencyIndex,
      currentCategory,
    } = this.props;
    //categories List
    const categoriesMarkup =
      categories &&
      categories.map((category, index) => {
        return (
          <Link key={index} to="/">
            <li
              className={currentCategory === category ? "active" : ""}
              id={category}
              onClick={this.setCategory}
            >
              {category}
            </li>
          </Link>
        );
      });
    //currencies List
    const currenciesMarkup =
      currencies &&
      currencies.map((currency, index) => {
        return (
          <li onClick={setCurrency} key={index} id={index}>
            {`${getCurrencySymbol(currency)} ${currency}`}
          </li>
        );
      });
    return (
      <nav className="nav-container">
        {/* Categories */}
        <ul className="categories">{categoriesMarkup}</ul>
        {/* Store logo */}
        <div className="logo">
          <Link to="/">
            <img src={StoreLogo} alt="logo" />
          </Link>
        </div>
        {/* Currencies and Cart */}
        <div className="actions">
          <div className="currency-container">
            <span onClick={this.toggleCurrencies} className="currency-logo">
              {currencies && getCurrencySymbol(currencies[currencyIndex])}
            </span>
            <img
              onClick={this.toggleCurrencies}
              className="arrow-down"
              src={ArrowDown}
              alt="arrow"
            />
            <ul
              className={`currencies ${
                this.state.showCurrencies ? "show" : ""
              }`}
            >
              {currenciesMarkup}
            </ul>
          </div>
          <img className="cart-icon" src={CartLogo} alt="cart" />
          <MiniCart />
        </div>
      </nav>
    );
  }
}

//mapping state and dispatch actions to props
const mapStateToProps = (state) => {
  const { products } = state.products;
  const currencies =
    products[0] && products[0].prices.map((price) => price.currency);
  const allCategories = products && products.map((product) => product.category);
  const uniqueCategories = [...new Set(allCategories)];
  return {
    currencies: currencies,
    categories: uniqueCategories,
    currencyIndex: state.products.currencyIndex,
    currentCategory: state.products.currentCategory,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (e) => dispatch({ type: SET_CURRENCY, payload: e.target.id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
