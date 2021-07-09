import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { REMOVE_FROM_CART, CHANGE_QUANTITY } from "../../../redux/actionTypes";

export class ProductRightSide extends PureComponent {
  render() {
    const { product, quantity, gallery, changeQuantity } = this.props;
    return (
      <div className="product-rightside">
        <div className="change-quantity">
          <button
            onClick={() => changeQuantity(product, quantity + 1)}
            className="quantity-sign"
          >
            +
          </button>
          <p className="quantity">{quantity}</p>
          <button
            onClick={() => {
              changeQuantity(product, quantity - 1);
            }}
            className="quantity-sign"
          >
            -
          </button>
        </div>
        <div className="product-image">
          <img src={gallery[0]} alt="product" />
        </div>
      </div>
    );
  }
}
ProductRightSide.propTypes = {
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  gallery: PropTypes.array.isRequired,
  changeQuantity: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeQuantity: (product, newQuantity) => {
      if (newQuantity === 0) {
        dispatch({ type: REMOVE_FROM_CART, payload: product });
      } else {
        dispatch({
          type: CHANGE_QUANTITY,
          payload: { product, newQuantity },
        });
      }
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductRightSide);
