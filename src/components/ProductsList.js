import React, { Component } from "react";
import CircleIcon from "../icons/Circle Icon.svg";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
//util
import getCurrencySymbol from "../util/getCurrencySymbol";
//styles
import "../styles/productsList.css";

class ProductsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { products, loading, currentCategory, currencyIndex } = this.props;
    //filtering products according to current category
    const filteredProducts = products
      ? products.filter((product) => product.category === currentCategory)
      : [];
    return (
      <section className="products-section">
        <h1 className="main-header">{currentCategory}</h1>
        <div className="products-container">
          {!loading ? (
            products &&
            filteredProducts.map((product) => {
              const currencySymbol = getCurrencySymbol(
                product.prices[currencyIndex].currency
              );
              return (
                <div key={product.name} className="product-container">
                  <Link to={`/product/${product.name}`}>
                    <div
                      className={`out-of-stock ${!product.inStock && "show"}`}
                    >
                      <p>out of stock</p>
                    </div>
                  </Link>
                  <Link to={`/product/${product.name}`}>
                    <div className="img-holder">
                      <img className="img" src={product.gallery[0]} alt="img" />
                      <img className="icon" src={CircleIcon} alt="img" />
                    </div>
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">
                      {`${currencySymbol} ${product.prices[currencyIndex].amount}`}
                    </p>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    );
  }
}

//mapping state and dispatch actions to props
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    loading: state.products.loading,
    currentCategory: state.products.currentCategory,
    currencyIndex: state.products.currencyIndex,
  };
};

export default connect(mapStateToProps)(ProductsList);
