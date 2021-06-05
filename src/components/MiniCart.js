import React, { Component } from "react";
import { Link } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { REMOVE_FROM_CART, CHANGE_QUANTITY } from "../redux/actionTypes";
//styles
import "../styles/miniCart.css";
//util
import getCurrencySymbol from "../util/getCurrencySymbol";

class MiniCart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      products,
      currencyIndex,
      changeQuantity,
      allProducts,
      showMiniCart,
      hideMiniCart,
    } = this.props;
    const currentCurrency = allProducts[0]
      ? getCurrencySymbol(allProducts[0].prices[currencyIndex].currency)
      : "$";
    return (
      <div className="minicart-container">
        <h1>
          My Bag,
          <span>
            {` ${products.length}`} {products.length === 1 ? "item" : "items"}
          </span>
        </h1>
        {products.map((product) => {
          const { name, prices, gallery, attributes, userSelection, quantity } =
            product;
          const productPrice = (
            prices[currencyIndex].amount * quantity
          ).toFixed(2);

          return (
            <div key={name} className="product">
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
                    onClick={() => changeQuantity(product, quantity - 1)}
                    className="quantity-sign"
                  >
                    -
                  </button>
                </div>
                <div className="product-image">
                  <img src={product.gallery[0]} />
                </div>
              </div>
            </div>
          );
        })}
        <div className="total-price">
          <p className="total">Total</p>
          <p className="price">{`${currentCurrency} ${calculateTotal(
            products,
            currencyIndex
          )}`}</p>
        </div>
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
const calculateTotal = (products, currencyIndex) => {
  let total = 0;
  products.forEach((product) => {
    const { prices, quantity } = product;
    total =
      total + parseFloat((prices[currencyIndex].amount * quantity).toFixed(2));
  });
  return total.toFixed(2);
};
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
        const productName = product.name;
        dispatch({
          type: CHANGE_QUANTITY,
          payload: { productName, newQuantity },
        });
      }
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
