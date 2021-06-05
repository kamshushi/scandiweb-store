import React, { Component, Fragment } from "react";
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
    console.log(gallery.length);
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
  componentDidMount() {
    const items = document.getElementsByClassName("item-container");
    console.log(items);
    Array.prototype.forEach.call(items, (item, index) => {
      const x = this.state.items;
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
          const { quantity, userSelection, name, gallery, attributes, prices } =
            product;
          return (
            <div key={name} className="item-container">
              <div className="item-info">
                <h1>{name.split(" ")[0]}</h1>
                {name.split(" ").length !== 1 && (
                  <h2>{name.substr(name.indexOf(" ") + 1)}</h2>
                )}
                <p>{`${getCurrencySymbol(prices[currencyIndex].currency)} ${(
                  prices[currencyIndex].amount * quantity
                ).toFixed(2)}`}</p>
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
                      <img src={gallery[0]} alt="image" />
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
                            <img src={image} alt="image" />
                          </div>
                        ) : (
                          ""
                        );
                      })}
                    <div className="carousel-actions">
                      <button
                        onClick={() =>
                          this.displayPrevSlide(productIndex, gallery)
                        }
                        id="carousel-button-prev"
                      >
                        <img src={leftArrow} alt="icon" />
                      </button>
                      <button
                        onClick={() =>
                          this.displayNextSlide(productIndex, gallery)
                        }
                        id="carousel-button-next"
                      >
                        <img src={rightArrow} alt="icon" />
                      </button>
                    </div>
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
        const productName = product.name;
        dispatch({
          type: CHANGE_QUANTITY,
          payload: { productName, newQuantity },
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
