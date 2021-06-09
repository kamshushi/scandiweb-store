import React, { Component } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Components
import MiniCart from "./MiniCart";
import CurrenciesDropDown from "./CurrenciesDropdown";
import MiniCartHolder from "./MiniCartHolder";
//icons
import StoreLogo from "../icons/Brand icon.svg";
import CartLogo from "../icons/Cart.svg";
//redux
import { connect } from "react-redux";
import store from "../redux/store";
import {
  CHANGE_SHOW_CURRENCIES,
  CHANGE_SHOW_MINICART,
  SET_CATEGORY,
} from "../redux/actionTypes";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: getStorageTheme(),
    };
  }
  //Set current category
  setCategory = (e) => {
    store.dispatch({ type: SET_CATEGORY, payload: e.target.id });
  };
  // Hides dropdown menus (currencies and minicart) on window click
  hideDropDownsOnScreenClick = (e) => {
    if (!e.target.matches(".currency-logo, .arrow-down")) {
      this.props.toggleCurrencies(false);
    }
    if (
      !e.target.matches(
        ".cart-icon, .cart-icon img , .nav-container , .minicart-container , .minicart-container *, .cart-icon .num-of-products "
      )
    ) {
      this.props.toggleMiniCart(false);
    }
  };

  toggleTheme = () => {
    const state = this.state;
    if (state.theme === "light-theme") {
      this.setState({
        ...state,
        theme: "dark-theme",
      });
    } else {
      this.setState({
        ...state,
        theme: "light-theme",
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.className = this.state.theme;
      localStorage.setItem("theme", this.state.theme);
    }
  }
  componentDidMount() {
    window.addEventListener("click", this.hideDropDownsOnScreenClick);
    document.documentElement.className = this.state.theme;
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.hideDropDownsOnScreenClick);
  }
  render() {
    const {
      categories,
      currentCategory,
      loading,
      showMiniCart,
      toggleCurrencies,
      toggleMiniCart,
    } = this.props;
    //categories List
    const categoriesMarkup =
      !loading &&
      categories.map((category, index) => {
        return (
          <Link key={index} to="/">
            <div
              className={currentCategory === category ? "active" : ""}
              id={category}
              onClick={this.setCategory}
            >
              {category}
            </div>
          </Link>
        );
      });

    return (
      <nav className="nav-container">
        {/* Categories */}
        <div className="categories">{categoriesMarkup}</div>
        {/* Store logo */}
        <div className="logo">
          <Link to="/">
            <img src={StoreLogo} alt="logo" />
          </Link>
        </div>
        <div className="actions">
          {/* Dark mode */}
          <span onClick={this.toggleTheme} className="dark-mode-icon">
            &#x263d;
          </span>
          {/* Currencies  */}
          <CurrenciesDropDown toggleCurrencies={toggleCurrencies} />
          {/*  MiniCart */}
          <MiniCartHolder toggleMiniCart={toggleMiniCart} />
        </div>
        <div
          className={`minicart-overlay ${showMiniCart ? "show-overlay" : ""}`}
        ></div>
      </nav>
    );
  }
}
// PropTypes
Navbar.propTypes = {
  categories: PropTypes.array.isRequired,
  currentCategory: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};
// Get Theme from local storage
const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};
//mapping state and dispatch actions to props
const mapStateToProps = (state) => {
  const { products } = state.products;

  const allCategories = products && products.map((product) => product.category);
  const uniqueCategories = [...new Set(allCategories)];
  return {
    loading: state.products.loading,
    categories: uniqueCategories,
    currentCategory: state.products.currentCategory,
    showMiniCart: state.UI.showMiniCart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleCurrencies: (value) => {
      dispatch({ type: CHANGE_SHOW_CURRENCIES, payload: value });
    },
    toggleMiniCart: (value) => {
      dispatch({ type: CHANGE_SHOW_MINICART, payload: value });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
