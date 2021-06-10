import React, { Component } from "react";
import PropTypes from "prop-types";

export class SmallImages extends Component {
  render() {
    const { gallery, setCurrentImage } = this.props;
    return (
      <div className="img-list">
        {gallery.map((photo, index) => (
          <img
            onClick={setCurrentImage}
            id={index}
            key={index}
            src={photo}
            alt="img"
          />
        ))}
      </div>
    );
  }
}
SmallImages.propTypes = {
  gallery: PropTypes.array.isRequired,
  setCurrentImage: PropTypes.func.isRequired,
};
export default SmallImages;
