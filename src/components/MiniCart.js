import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//redux
import { connect } from "react-redux";
import {
  REMOVE_FROM_CART,
  CHANGE_QUANTITY,
  CHANGE_SHOW_MINICART,
} from "../redux/actionTypes";
//styles
import "../styles/miniCart.css";
//util
import getCurrencySymbol from "../util/getCurrencySymbol";

class MiniCart extends Component {
  render() {
    const {
      products,
      currencyIndex,
      changeQuantity,
      allProducts,
      hideMiniCart,
    } = this.props;
    const currentCurrency = allProducts[0]
      ? getCurrencySymbol(allProducts[0].prices[currencyIndex].currency)
      : "$";
    return (
      // MiniCart container
      <div className="minicart-container">
        <h1>
          My Bag,
          <span>
            {` ${products.length}`} {products.length === 1 ? "item" : "items"}
          </span>
        </h1>
        {/* Products List */}
        {products.map((product) => {
          const {
            id,
            name,
            prices,
            gallery,
            attributes,
            userSelection,
            quantity,
          } = product;
          const productPrice = (
            prices[currencyIndex].amount * quantity
          ).toFixed(2);

          return (
            <div key={id} className="product">
              {/* Product info */}
              <div className="product-info">
                <h3>{name.split(" ")[0]}</h3>
                {name.split(" ").length !== 1 && (
                  <p>{name.substr(name.indexOf(" ") + 1)}</p>
                )}
                <strong>{`${currentCurrency} ${productPrice}`}</strong>
                {attributes[0] && (
                  <ul className="attributes">
                    {attributes[0].items.map((item) => (
                      <li
                        key={item.id}
                        className={`${
                          userSelection[attributes[0].name] === item.value
                            ? "active"
                            : ""
                        }`}
                      >
                        {item.value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Image and quantity buttons */}
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
            </div>
          );
        })}
        {/* Total price */}
        <div className="total-price">
          <p className="total">Total</p>
          <p className="price">{`${currentCurrency} ${calculateTotal(
            products,
            currencyIndex
          )}`}</p>
        </div>
        {/* Bottom buttons */}
        <div className="bottom-buttons">
          <Link onClick={hideMiniCart} className="view-bag" to="/cart">
            <button>view bag</button>
          </Link>
          <button className="check-out">check out</button>
        </div>
      </div>
    );
  }
}
// PropTypes
MiniCart.propTypes = {
  allProducts: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  currencyIndex: PropTypes.number.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  hideMiniCart: PropTypes.func.isRequired,
};
// Get total price
const calculateTotal = (products, currencyIndex) => {
  let total = 0;
  products.forEach((product) => {
    const { prices, quantity } = product;
    total =
      total + parseFloat((prices[currencyIndex].amount * quantity).toFixed(2));
  });
  return total.toFixed(2);
};
// Map state and dispatch to props
const mapStateToProps = (state) => {
  return {
    allProducts: state.products.products,
    products: state.cart.products,
    currencyIndex: state.products.currencyIndex,
  };
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
    hideMiniCart: () =>
      dispatch({ type: CHANGE_SHOW_MINICART, payload: false }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
