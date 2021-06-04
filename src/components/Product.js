import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_TO_CART } from "../redux/actionTypes";
//styles
import "../styles/product.css";
//util
import getCurrencySymbol from "../util/getCurrencySymbol";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: props.match.params.name,
      currentImageIndex: 0,
      infoSelected: {},
    };
  }
  productIsInCart = (product) => {
    const products = this.props.productsInCart;
    console.log(products);
    for (let i in products) {
      if (products[i].name === product.name) {
        return true;
      }
    }
    return false;
  };
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
    const { products, currencyIndex, productsInCart } = this.props;
    const currentProduct =
      products &&
      products.find((product) => product.name === this.state.productName);
    // product with user data and quantity of 1
    const currentProductWithInfo = Object.assign(
      { quantity: 1, userSelection: this.state.infoSelected },
      currentProduct
    );
    const {
      name,
      attributes,
      category,
      description,
      gallery,
      inStock,
      prices,
    } = currentProduct ? currentProduct : {};
    currentProduct && console.log(this.productIsInCart(currentProduct));
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
            {/* product's title */}
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
              {Object.keys(this.state.infoSelected).length ===
                attributes.length && !this.productIsInCart(currentProduct) ? (
                <Link
                  onClick={() => this.props.addToCart(currentProductWithInfo)}
                  to="/cart"
                >
                  <button className="add-to-cart">add to cart</button>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={(e) =>
                      (e.target.parentElement.lastChild.style = "display:block")
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
const mapStateToProps = (state) => {
  return {
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
