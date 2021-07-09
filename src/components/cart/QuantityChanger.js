import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class QuantityChanger extends PureComponent {
  render() {
    const { changeQuantity, product, quantity } = this.props;
    return (
      <div className="change-quantity">
        <button
          onClick={() => changeQuantity(product, quantity + 1)}
          className="quantity-sign"
        >
          +
        </button>
        <p className="quantity">{quantity}</p>
        <button
          onClick={() => changeQuantity(product, quantity - 1)}
          className="quantity-sign"
        >
          -
        </button>
      </div>
    );
  }
}
QuantityChanger.propTypes = {
  changeQuantity: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default QuantityChanger;
