import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Components
import MiniCart from "./MiniCart";
// Redux
import { connect } from "react-redux";
import { CHANGE_SHOW_MINICART } from "../../../redux/actionTypes";
// Icons
import CartLogo from "../../../icons/Cart.svg";

class MiniCartHolder extends Component {
  // Hide scroll on opening the minicart
  componentDidUpdate() {
    if (this.props.showMiniCart) {
      // document.body.style = "overflow:hidden";
    } else {
      document.body.style = "overflow:auto";
    }
  }
  render() {
    const { productsInCart, showMiniCart, toggleMiniCart } = this.props;
    return (
      <Fragment>
        <div className="cart-icon">
          <img
            onClick={() => toggleMiniCart(!showMiniCart)}
            src={CartLogo}
            alt="cart-icon"
          />
          {productsInCart.length > 0 && (
            <span
              onClick={() => toggleMiniCart(!showMiniCart)}
              className="num-of-products"
            >
              {productsInCart.length}
            </span>
          )}
        </div>
        {showMiniCart && <MiniCart />}
        <div
          className={`minicart-overlay ${showMiniCart ? "show-overlay" : ""}`}
        ></div>
      </Fragment>
    );
  }
}
MiniCartHolder.propTypes = {
  productsInCart: PropTypes.array.isRequired,
  showMiniCart: PropTypes.bool.isRequired,
  toggleMiniCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    showMiniCart: state.UI.showMiniCart,
    productsInCart: state.cart.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleMiniCart: (value) => {
      dispatch({ type: CHANGE_SHOW_MINICART, payload: value });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MiniCartHolder);
