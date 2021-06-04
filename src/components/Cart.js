import React, { Component, Fragment } from "react";
//redux
import { connect } from "react-redux";
import { CHANGE_QUANTITY } from "../redux/actionTypes";
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
  }
  componentDidMount() {}
  render() {
    const { products, changeQuantity, currencyIndex } = this.props;
    return (
      <section className="cart-section">
        <h1 className="cart-header">cart</h1>
        {products.map((product) => {
          const { quantity, userSelection, name, gallery, attributes, prices } =
            product;

          return (
            <div key={name} className="item-container">
              <div className="item-info">
                <h1>{name.split(" ")[0]}</h1>
                {name.split(" ").length !== 1 && (
                  <h2>{name.substr(name.indexOf(" ") + 1)}</h2>
                )}{" "}
                <p>{`${getCurrencySymbol(prices[currencyIndex].currency)} ${
                  prices[currencyIndex].amount
                }`}</p>
                {attributes.map((attribute) => {
                  const { id, name, items, type } = attribute;
                  return (
                    <div key={id}>
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
                  <div className="quantity-sign">+</div>
                  <p className="quantity">2</p>
                  <div className="quantity-sign">-</div>
                </div>
                <div className="img-slider">
                  {/* <img className="slide" src={gallery[0]} /> */}
                  <div className="carousel">
                    {/* <div className="carousel-item carousel-item-visible">
                      <img src={gallery[0]} />
                    </div>
                    <div className="carousel-item">
                      <img src={gallery[1]} />
                    </div>
                    <div className="carousel-item">
                      <img src={gallery[2]} />
                    </div>
                    <div className="carousel-actions">
                      <button id="carousel-button-prev">
                        <img src={leftArrow} alt="icon" />
                      </button>
                      <button id="carousel-button-next">
                        <img src={rightArrow} alt="icon" />
                      </button>
                    </div> */}
                    <div className="carousel-item carousel-item-visible">
                      <img src={gallery[0]} alt="image" />
                    </div>
                    {gallery.length > 1 &&
                      gallery.map((image, index) => {
                        return index > 0 ? (
                          <div key={image} className="carousel-item ">
                            <img src={image} alt="image" />
                          </div>
                        ) : (
                          ""
                        );
                      })}
                    <div className="carousel-actions">
                      <button id="carousel-button-prev">
                        <img src={leftArrow} alt="icon" />
                      </button>
                      <button id="carousel-button-next">
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
    changeQuantity: (productName, newQuantity) =>
      dispatch({
        type: CHANGE_QUANTITY,
        payload: { productName, newQuantity },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
