import React, { Component } from "react";
import CircleIcon from "../../icons/Circle Icon.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Components
import SearchBar from "./SearchBar";
//Redux
import { connect } from "react-redux";
//util
import getCurrencySymbol from "../../util/getCurrencySymbol";
//styles
import "../../styles/productsList.css";

class ProductsList extends Component {
  render() {
    const { products, loading, currentCategory, currencyIndex } = this.props;
    //filtering products according to current category
    const ProductsInCategory = !loading
      ? products.filter((product) => {
          if (currentCategory !== "all") {
            return product.category === currentCategory;
          } else {
            return product;
          }
        })
      : [];
    return (
      <section className="products-section">
        <h1 className="main-header">{currentCategory}</h1>
        <SearchBar />
        <div className="products-container">
          {!loading ? (
            // Products list
            ProductsInCategory.map((product) => {
              const { id, name, inStock, gallery, prices } = product;
              const currencySymbol = getCurrencySymbol(
                prices[currencyIndex].currency
              );
              return (
                <div key={id} className="product-container">
                  <Link to={`/product/${id}`}>
                    <div className={`out-of-stock ${!inStock && "show"}`}>
                      <p>out of stock</p>
                    </div>
                  </Link>
                  <Link to={`/product/${id}`}>
                    <div className="img-holder">
                      <img className="img" src={gallery[0]} alt="img" />
                      <img className="icon" src={CircleIcon} alt="img" />
                    </div>
                    <p className="product-name">{name}</p>
                    <p className="product-price">
                      {`${currencySymbol} ${prices[currencyIndex].amount}`}
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
// PropTypes
ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  currentCategory: PropTypes.string.isRequired,
  currencyIndex: PropTypes.number.isRequired,
};
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
