import React, { Component } from "react";
import { connect } from "react-redux";
//styles
import "../styles/product.css";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: props.match.params.name,
      currentImageIndex: 0,
    };
  }
  setCurrentImage = (e) => {
    this.setState({
      ...this.state,
      currentImageIndex: e.target.id,
    });
  };
  render() {
    const { products } = this.props;
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
  };
};

export default connect(mapStateToProps)(Product);
