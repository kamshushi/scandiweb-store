import React, { Component } from "react";
import PropTypes from "prop-types";
// Components
import ProductAttributes from "./ProductAttributes";
import SmallImages from "./SmallImages";
import AddToCartBtn from "./AddToCartBtn";
// redux
import { connect } from "react-redux";
import { ADD_TO_CART } from "../../redux/actionTypes";
//styles
import "../../styles/product.css";
//util
import getCurrencySymbol from "../../util/getCurrencySymbol";
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
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { products, currencyIndex, loading, addToCart } = this.props;
    const { infoSelected } = this.state;
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
              <SmallImages
                gallery={gallery}
                setCurrentImage={this.setCurrentImage}
              />
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
                return (
                  <ProductAttributes
                    key={attribute.id}
                    attribute={attribute}
                    infoSelected={infoSelected}
                    setInfoSelected={this.setInfoSelected}
                  />
                );
              })}
              <h3>price:</h3>
              <p className="price">
                {`${getCurrencySymbol(prices[currencyIndex].currency)} ${
                  prices[currencyIndex].amount
                }`}
              </p>
              {/* Add to cart button that changes according to given data */}
              <AddToCartBtn
                inStock={inStock}
                infoSelected={infoSelected}
                attributes={attributes}
                addToCart={addToCart}
                currentProductWithInfo={currentProductWithInfo}
              />
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
