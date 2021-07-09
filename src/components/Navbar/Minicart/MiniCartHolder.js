import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
// Components
import MiniCart from "./MiniCart";
// Redux
import { connect } from "react-redux";
import { CHANGE_SHOW_MINICART } from "../../../redux/actionTypes";
// Icons
import CartLogo from "../../../icons/Cart.svg";
// util
import calculateTotalProducts from "../../../util/calculateTotalProducts";

class MiniCartHolder extends PureComponent {
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
              {calculateTotalProducts(productsInCart)}
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
