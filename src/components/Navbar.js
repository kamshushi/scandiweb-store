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
  //Set current category
  setCategory = (e) => {
    store.dispatch({ type: SET_CATEGORY, payload: e.target.id });
  };
  hideDropDownsOnScreenClick = (e) => {
    if (!e.target.matches(".currency-logo, .arrow-down")) {
      this.setState({ ...this.state, showCurrencies: false });
    }
    if (
      !e.target.matches(
        ".cart-icon, .cart-icon img , .nav-container , .minicart-container , .minicart-container *, .cart-icon .num-of-products "
      )
    ) {
      this.setState({ ...this.state, showMiniCart: false });
    }
  };
  toggleCurrencies = () => {
    this.setState({
      ...this.state,
      showCurrencies: !this.state.showCurrencies,
      showMiniCart: false,
    });
  };
  toggleMiniCart = () => {
    console.log("toggled");
    this.setState({
      ...this.state,
      showCurrencies: false,
      showMiniCart: !this.state.showMiniCart,
    });
  };
  hideMiniCart = () => {
    this.setState({
      ...this.state,
      showMiniCart: false,
    });
  };
  componentDidMount() {
    window.addEventListener("click", this.hideDropDownsOnScreenClick);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.hideDropDownsOnScreenClick);
  }
  render() {
    const { showCurrencies, showMiniCart } = this.state;
    const {
      categories,
      currencies,
      setCurrency,
      currencyIndex,
      currentCategory,
      productsInCart,
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
            <ul className={`currencies ${showCurrencies ? "show" : ""}`}>
              {currenciesMarkup}
            </ul>
          </div>
          <div className="cart-icon">
            <img onClick={this.toggleMiniCart} src={CartLogo} alt="cart-icon" />
            {productsInCart.length > 0 && (
              <span onClick={this.toggleMiniCart} className="num-of-products">
                {productsInCart.length}
              </span>
            )}
          </div>
          {/* passing hideMiniCart to be able to close the mini-cart on click on view bags btn */}
          {showMiniCart && (
            <MiniCart
              hideMiniCart={this.hideMiniCart}
              showMiniCart={showMiniCart}
            />
          )}
        </div>
        <div
          className={`minicart-overlay ${showMiniCart ? "show-overlay" : ""}`}
        ></div>
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
    productsInCart: state.cart.products,
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
