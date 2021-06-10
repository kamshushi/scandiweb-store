import React, { Component } from "react";
import PropTypes from "prop-types";
// components
import CartProductAttributes from "./CartProductAttributes";
import Carousel from "./Carousel";
import QuantityChanger from "./QuantityChanger";
//redux
import { connect } from "react-redux";
import { CHANGE_QUANTITY, REMOVE_FROM_CART } from "../../redux/actionTypes";
//util
import getCurrencySymbol from "../../util/getCurrencySymbol";
//styles
import "../../styles/cart.css";
//slider
import "../../styles/carousel.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { products, changeQuantity, currencyIndex } = this.props;
    return (
      <section className="cart-section">
        <h1 className="cart-header">cart</h1>
        {products.map((product, productIndex) => {
          const {
            quantity,
            userSelection,
            name,
            gallery,
            attributes,
            prices,
            timeAdded,
          } = product;
          return (
            <div key={timeAdded} className="item-container">
              {/* item info */}

              {/* Header */}
              <div className="item-info">
                <h1>{name.split(" ")[0]}</h1>
                {name.split(" ").length !== 1 && (
                  <h2>{name.substr(name.indexOf(" ") + 1)}</h2>
                )}
                {/* Price */}
                <p>{`${getCurrencySymbol(prices[currencyIndex].currency)} ${(
                  prices[currencyIndex].amount * quantity
                ).toFixed(2)}`}</p>
                {/* Attributes */}
                {attributes.map((attribute) => {
                  return (
                    <CartProductAttributes
                      key={attribute.id}
                      attribute={attribute}
                      userSelection={userSelection}
                    />
                  );
                })}
              </div>
              {/* Carousel and quantity changer */}
              <div className="item-gallery">
                {/* Quantity Changer */}
                <QuantityChanger
                  changeQuantity={changeQuantity}
                  product={product}
                  quantity={quantity}
                />
                {/* Carousel */}
                <Carousel gallery={gallery} productIndex={productIndex} />
              </div>
              <div className="clearfix"></div>
            </div>
          );
        })}
      </section>
    );
  }
}
// PropTypes
Cart.propTypes = {
  products: PropTypes.array.isRequired,
  currencyIndex: PropTypes.number.isRequired,
  changeQuantity: PropTypes.func.isRequired,
};
// Mapping state and dispatch to props
const mapStateToProps = (state) => {
  return {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
