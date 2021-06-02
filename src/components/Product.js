import React, { Component } from "react";
import { connect } from "react-redux";
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
    const { products, currencyIndex } = this.props;
    const currentProduct =
      products &&
      products.find((product) => product.name === this.state.productName);
    console.log(currentProduct);
    const {
      name,
      attributes,
      category,
      description,
      gallery,
      inStock,
      prices,
    } = currentProduct ? currentProduct : {};
    return (
      <section className="product-section">
        {currentProduct ? (
          <div className="product-grid-container">
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
            <div className="current-image">
              <img src={gallery[this.state.currentImageIndex]} alt="img" />
            </div>
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
                            {type === "swatch" ? "" : item.value}
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
              <button className="add-to-cart">add to cart</button>
              <p className="description">{description}</p>
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
    products: state.products,
    currencyIndex: state.currencyIndex,
  };
};

export default connect(mapStateToProps)(Product);
