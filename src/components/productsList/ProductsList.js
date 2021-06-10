import React, { Component } from "react";

import PropTypes from "prop-types";
// Components
import SearchBar from "./SearchBar";
import ProductInList from "./ProductInList";
//Redux
import { connect } from "react-redux";
//styles
import "../../styles/productsList.css";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }
  setSearchTerm = (value) => {
    this.setState({
      ...this.state,
      searchTerm: value,
    });
  };
  render() {
    const { productsInCategory, loading, currencyIndex, currentCategory } =
      this.props;
    const { searchTerm } = this.state;
    // filtering products according to search term
    const filteredProducts = productsInCategory.filter((product) => {
      if (searchTerm !== "") {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return product;
      }
    });
    return (
      <section className="products-section">
        <h1 className="main-header">{currentCategory}</h1>
        <SearchBar setSearchTerm={this.setSearchTerm} />
        <div className="products-container">
          {!loading ? (
            filteredProducts.length > 0 ? (
              // Products list
              filteredProducts.map((product) => {
                return (
                  <ProductInList
                    key={product.id}
                    product={product}
                    currencyIndex={currencyIndex}
                  />
                );
              })
            ) : (
              <h3 className="product-not-found">No products were found</h3>
            )
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
  productsInCategory: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  currentCategory: PropTypes.string.isRequired,
  currencyIndex: PropTypes.number.isRequired,
};
//mapping state and dispatch actions to props
const mapStateToProps = (state) => {
  const { products, loading, currentCategory } = state.products;
  const productsInCategory = !loading
    ? products.filter((product) => {
        if (currentCategory !== "all") {
          return product.category === currentCategory;
        } else {
          return product;
        }
      })
    : [];
  return {
    productsInCategory: productsInCategory,
    loading: loading,
    currentCategory: state.products.currentCategory,
    currencyIndex: state.products.currencyIndex,
  };
};

export default connect(mapStateToProps)(ProductsList);
