import React, { Component } from "react";
import PropTypes from "prop-types";

class CartProductAttributes extends Component {
  render() {
    const {
      userSelection,
      attribute: { id, name, items, type },
    } = this.props;
    return (
      <div className="attr-container" key={id}>
        <h3>{`${name}:`}</h3>
        <ul className="options">
          {items.map((item) => {
            return (
              <li
                key={item.id}
                className={`option ${type === "swatch" ? "swatch" : ""} ${
                  userSelection[name] === item.value ? "active" : ""
                }`}
                style={type === "swatch" ? { backgroundColor: item.value } : {}}
              >
                {type === "swatch" ? (
                  userSelection[name] === item.value ? (
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
CartProductAttributes.propTypes = {
  userSelection: PropTypes.object.isRequired,
  attribute: PropTypes.object.isRequired,
};

export default CartProductAttributes;
