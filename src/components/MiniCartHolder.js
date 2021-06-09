import React, { Component, Fragment } from "react";
// Components
import MiniCart from "./MiniCart";
// Redux
import { connect } from "react-redux";
// Icons
import CartLogo from "../icons/Cart.svg";

class MiniCartHolder extends Component {
  constructor(props) {
    super(props);
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
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showMiniCart: state.UI.showMiniCart,
    productsInCart: state.cart.products,
  };
};

export default connect(mapStateToProps)(MiniCartHolder);
