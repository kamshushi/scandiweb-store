import React, { Component } from "react";
//redux
import { connect } from "react-redux";
import { CHANGE_QUANTITY } from "../redux/actionTypes";
//styles
import "../styles/cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { products, changeQuantity } = this.props;
    return (
      <section className="cart-section">
        <h1 className="cart-header">cart</h1>
        <div className="item-container">
          <div className="item-info">
            <h1>Apollo</h1>
            <h2>Running Short</h2>
            <p>$50.00</p>
          </div>
          <div className="item-gallery">
            <div className="change-quantity"></div>
            <div className="img-slider"></div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeQuantity: (productName, newQuantity) =>
      dispatch({
        type: CHANGE_QUANTITY,
        payload: { productName, newQuantity },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
