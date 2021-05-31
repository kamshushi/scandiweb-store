import React, { Component } from "react";
import { client, Query, Field, InlineFragment } from "@tilework/opus";
import "../styles/productsList.css";
import CircleIcon from "../icons/Circle Icon.svg";
//Redux
import { connect } from "react-redux";
import store from "../redux/store";
import { getProducts } from "../redux/actions";

class ProductsList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const { products, loading, currentCategory } = this.props;

    const filteredProducts = products
      ? products.filter((product) => product.category === currentCategory)
      : [];
    console.log(loading);
    return (
      <section className="products-section">
        <h1 className="main-header">{currentCategory}</h1>
        <div className="products-container">
          {!loading ? (
            products &&
            filteredProducts.map((product) => {
              return (
                <div key={product.name} className="product-container">
                  <div className={`out-of-stock ${!product.inStock && "show"}`}>
                    <p>out of stock</p>
                  </div>
                  <div className="img-holder">
                    <img className="img" src={product.gallery[0]} alt="img" />
                    <img className="icon" src={CircleIcon} alt="img" />
                  </div>
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">${product.prices[0].amount}</p>
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

const mapStateToProps = (state) => {
  return {
    products: state.products,
    loading: state.loading,
    currentCategory: state.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(getProducts()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
