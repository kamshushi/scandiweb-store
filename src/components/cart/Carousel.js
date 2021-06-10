import React, { Component } from "react";
import PropTypes from "prop-types";
// icons
import rightArrow from "../../icons/right arrow.svg";
import leftArrow from "../../icons/left arrow.svg";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  displayNextSlide = (productIndex, gallery) => {
    if (this.state[productIndex] === gallery.length - 1) {
      this.setState({
        ...this.state,
        [productIndex]: 0,
      });
    } else {
      this.setState({
        ...this.state,
        [productIndex]: this.state[productIndex] + 1,
      });
    }
  };
  displayPrevSlide = (productIndex, gallery) => {
    if (this.state[productIndex] === 0) {
      this.setState({
        ...this.state,
        [productIndex]: gallery.length - 1,
      });
    } else {
      this.setState({
        ...this.state,
        [productIndex]: this.state[productIndex] - 1,
      });
    }
  };
  // Display first image in each's products gallery as the first carousel image
  componentDidMount() {
    const items = document.getElementsByClassName("item-container");
    Array.prototype.forEach.call(items, (item, index) => {
      this.setState({
        ...this.state,
        [index]: 0,
      });
    });
  }
  render() {
    const { gallery, productIndex } = this.props;
    return (
      <div className="img-slider">
        <div className="carousel">
          <div
            className={`carousel-item ${
              this.state[productIndex] === 0 ? " carousel-item-visible" : ""
            }`}
          >
            <img src={gallery[0]} alt="product-gallery" />
          </div>
          {gallery.length > 1 &&
            gallery.map((image, index) => {
              return index > 0 ? (
                <div
                  key={image}
                  className={`carousel-item ${
                    this.state[productIndex] === index
                      ? " carousel-item-visible"
                      : ""
                  }`}
                >
                  <img src={image} alt="product-gallery" />
                </div>
              ) : (
                ""
              );
            })}
          {gallery.length > 1 ? (
            <div className="carousel-actions">
              <button
                onClick={() => this.displayPrevSlide(productIndex, gallery)}
                id="carousel-button-prev"
              >
                <img src={leftArrow} alt="left-arrow" />
              </button>
              <button
                onClick={() => this.displayNextSlide(productIndex, gallery)}
                id="carousel-button-next"
              >
                <img src={rightArrow} alt="right-arrow" />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
Carousel.propTypes = {
  gallery: PropTypes.array.isRequired,
  productIndex: PropTypes.number.isRequired,
};

export default Carousel;
