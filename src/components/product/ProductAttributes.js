import React, { Component } from "react";
import PropTypes from "prop-types";

export class ProductAttributes extends Component {
  render() {
    const {
      infoSelected,
      setInfoSelected,
      attribute: { id, name, items, type },
    } = this.props;
    return (
      <div key={id}>
        <h3>{`${name}:`}</h3>
        <ul className="options">
          {items.map((item) => {
            return (
              <li
                onClick={setInfoSelected}
                value={item.value}
                id={name}
                key={item.id}
                className={`option ${type === "swatch" ? "swatch" : ""} ${
                  infoSelected[name] === item.value ? "active" : ""
                }`}
                style={type === "swatch" ? { backgroundColor: item.value } : {}}
              >
                {type === "swatch" ? (
                  infoSelected[name] === item.value ? (
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
  }
}
ProductAttributes.propTypes = {
  infoSelected: PropTypes.object.isRequired,
  setInfoSelected: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
};

export default ProductAttributes;
