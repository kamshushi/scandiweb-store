//React stuff
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getProducts } from "./redux/actions";
import store from "./redux/store";
import {
  CHANGE_SHOW_MINICART,
  CHANGE_SHOW_CURRENCIES,
} from "./redux/actionTypes";
//components
import Navbar from "./components/Navbar/Navbar";
import ProductsList from "./components/productsList/ProductsList";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart";
//styles
import "./App.css";

//App Container

class App extends Component {
  // Hide dropdown menus on clicking anywhere in the screen
  hideDropDownsOnScreenClick = (e) => {
    const { showCurrencies, showMiniCart } = this.props;
    if (showCurrencies || showMiniCart) {
      if (!e.target.matches(".currency-logo, .arrow-down")) {
        store.dispatch({ type: CHANGE_SHOW_CURRENCIES, payload: false });
      }
      if (
        !e.target.matches(
          ".cart-icon, .cart-icon img , .nav-container , .minicart-container , .minicart-container *, .cart-icon .num-of-products,.product-grid-container .product-info .add-to-cart "
        )
      ) {
        store.dispatch({ type: CHANGE_SHOW_MINICART, payload: false });
      }
    }
  };
  componentDidMount() {
    this.props.fetchProducts();
    window.addEventListener("click", this.hideDropDownsOnScreenClick);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.hideDropDownsOnScreenClick);
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div className="app-container">
            <Navbar />
            <Switch>
              <Route exact path="/" component={ProductsList} />
              <Route exact path="/product/:name" component={Product} />
              <Route exact path="/cart" component={Cart} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    showMiniCart: state.UI.showMiniCart,
    showCurrencies: state.UI.showCurrencies,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(getProducts()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
