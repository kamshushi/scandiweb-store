import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { ADD_TO_CART } from "../redux/actionTypes";
//styles
import "../styles/product.css";
//util
import getCurrencySymbol from "../util/getCurrencySymbol";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.match.params.name,
      currentImageIndex: 0,
      infoSelected: {},
    };
  }
  productIsInCart = (product) => {
    const products = this.props.productsInCart;
    for (let i in products) {
      if (products[i].id === product.id) {
        return true;
      }
    }
    return false;
  };
  // Getting user's selection of attributes values
  setInfoSelected = (e) => {
    this.setState({
      ...this.state,
      infoSelected: {
        ...this.state.infoSelected,
        [e.target.id]: e.target.getAttribute("value"),
      },
    });
  };
  setCurrentImage = (e) => {
    this.setState({
      ...this.state,
      currentImageIndex: e.target.id,
    });
  };
  render() {
    const { products, currencyIndex, loading } = this.props;
    // Getting the product in the page
    const currentProduct =
      !loading &&
      products.find((product) => product.id === parseInt(this.state.productId));
    // Adding user attributes selection and a quantity of 1 to our product
    const currentProductWithInfo = Object.assign(
      { quantity: 1, userSelection: this.state.infoSelected },
      currentProduct
    );
    const { name, attributes, description, gallery, inStock, prices } =
      currentProduct ? currentProduct : {};
    return (
      <section className="product-section">
        {currentProduct ? (
          <div className="product-grid-container">
            {/* List of leftside images */}
            <div className="img-list">
              {gallery.map((photo, index) => (
                <img
                  onClick={this.setCurrentImage}
                  id={index}
                  key={index}
                  src={photo}
                  alt="img"
                />
              ))}
            </div>
            {/* Main middle image */}
            <div className="current-image">
              <img src={gallery[this.state.currentImageIndex]} alt="img" />
            </div>
            {/* product's dynamic title */}
            <div className="product-info">
              <h1>{name.split(" ")[0]}</h1>
              {name.split(" ").length !== 1 && (
                <h2>{name.substr(name.indexOf(" ") + 1)}</h2>
              )}
              {/* Attributes */}
              {attributes.map((attribute) => {
                const { id, name, items, type } = attribute;
                return (
                  <div key={id}>
                    <h3>{`${name}:`}</h3>
                    <ul className="options">
                      {items.map((item) => {
                        return (
                          <li
                            onClick={this.setInfoSelected}
                            value={item.value}
                            id={name}
                            key={item.id}
                            className={`option ${
                              type === "swatch" ? "swatch" : ""
                            } ${
                              this.state.infoSelected[name] === item.value
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
                              this.state.infoSelected[name] === item.value ? (
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
              <h3>price:</h3>
              <p className="price">
                {`${getCurrencySymbol(prices[currencyIndex].currency)} ${
                  prices[currencyIndex].amount
                }`}
              </p>
              {/* Add to cart button that changes according to given data */}
              {inStock ? (
                Object.keys(this.state.infoSelected).length ===
                  attributes.length && !this.productIsInCart(currentProduct) ? (
                  <button
                    onClick={() => this.props.addToCart(currentProductWithInfo)}
                    className="add-to-cart"
                  >
                    add to cart
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={(e) =>
                        (e.target.parentElement.lastChild.style =
                          "display:block")
                      }
                      className="add-to-cart"
                    >
                      add to cart
                    </button>
                    <p style={{ display: "none" }} className="error-text">
                      {this.productIsInCart(currentProduct)
                        ? "Product is already in cart"
                        : "please select your preferred options"}
                    </p>
                  </div>
                )
              ) : (
                <button disabled className="add-to-cart out-of-stock-button">
                  out of stock
                </button>
              )}
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </div>
        ) : (
          <p>loading...</p>
        )}
      </section>
    );
  }
}
// PropTypes
Product.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  currencyIndex: PropTypes.number.isRequired,
  productsInCart: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
};
// Map state and dispatch to props
const mapStateToProps = (state) => {
  return {
    loading: state.products.loading,
    products: state.products.products,
    currencyIndex: state.products.currencyIndex,
    productsInCart: state.cart.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch({ type: ADD_TO_CART, payload: product }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
