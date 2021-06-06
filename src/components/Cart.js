import React, { Component } from "react";
import PropTypes from "prop-types";
//redux
import { connect } from "react-redux";
import { CHANGE_QUANTITY, REMOVE_FROM_CART } from "../redux/actionTypes";
//util
import getCurrencySymbol from "../util/getCurrencySymbol";
//styles
import "../styles/cart.css";
//slider
import "../styles/carousel.css";
//icons
import rightArrow from "../icons/right arrow.svg";
import leftArrow from "../icons/left arrow.svg";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  displayNextSlide = (productIndex, gallery) => {
    if (this.state[productIndex] === gallery.length - 1) {
      this.setState({
        ...this.state,
        [productIndex]: 0,
      });
    } else {
      this.setState({
        ...this.state,
        [productIndex]: this.state[productIndex] + 1,
      });
    }
  };
  displayPrevSlide = (productIndex, gallery) => {
    if (this.state[productIndex] === 0) {
      this.setState({
        ...this.state,
        [productIndex]: gallery.length - 1,
      });
    } else {
      this.setState({
        ...this.state,
        [productIndex]: this.state[productIndex] - 1,
      });
    }
  };
  // Display first image in each's products gallery as the first carousel image
  componentDidMount() {
    const items = document.getElementsByClassName("item-container");
    Array.prototype.forEach.call(items, (item, index) => {
      this.setState({
        ...this.state,
        [index]: 0,
      });
    });
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
            id,
          } = product;
          return (
            <div key={id} className="item-container">
              {/* item info */}
              <div className="item-info">
                <h1>{name.split(" ")[0]}</h1>
                {name.split(" ").length !== 1 && (
                  <h2>{name.substr(name.indexOf(" ") + 1)}</h2>
                )}
                <p>{`${getCurrencySymbol(prices[currencyIndex].currency)} ${(
                  prices[currencyIndex].amount * quantity
                ).toFixed(2)}`}</p>
                {/* Attributes */}
                {attributes.map((attribute) => {
                  const { id, name, items, type } = attribute;
                  return (
                    <div className="attr-container" key={id}>
                      <h3>{`${name}:`}</h3>
                      <ul className="options">
                        {items.map((item) => {
                          return (
                            <li
                              key={item.id}
                              className={`option ${
                                type === "swatch" ? "swatch" : ""
                              } ${
                                userSelection[name] === item.value
                                  ? "active"
                                  : ""
                              }`}
                              style={
                                type === "swatch"
                                  ? { backgroundColor: item.value }
                                  : {}
                              }
                            >
                              {type === "swatch" ? (
                                userSelection[name] === item.value ? (
                                  <div className="selected-overlay">✓</div>
                                ) : (
                                  ""
                                )
                              ) : (
                                item.value
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
              {/* Carousel and quantity changer */}
              <div className="item-gallery">
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
                <div className="img-slider">
                  <div className="carousel">
                    <div
                      className={`carousel-item ${
                        this.state[productIndex] === 0
                          ? " carousel-item-visible"
                          : ""
                      }`}
                    >
                      <img src={gallery[0]} alt="product-gallery" />
                    </div>
                    {gallery.length > 1 &&
                      gallery.map((image, index) => {
                        return index > 0 ? (
                          <div
                            key={image}
                            className={`carousel-item ${
                              this.state[productIndex] === index
                                ? " carousel-item-visible"
                                : ""
                            }`}
                          >
                            <img src={image} alt="product-gallery" />
                          </div>
                        ) : (
                          ""
                        );
                      })}
                    {gallery.length > 1 ? (
                      <div className="carousel-actions">
                        <button
                          onClick={() =>
                            this.displayPrevSlide(productIndex, gallery)
                          }
                          id="carousel-button-prev"
                        >
                          <img src={leftArrow} alt="left-arrow" />
                        </button>
                        <button
                          onClick={() =>
                            this.displayNextSlide(productIndex, gallery)
                          }
                          id="carousel-button-next"
                        >
                          <img src={rightArrow} alt="right-arrow" />
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
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
