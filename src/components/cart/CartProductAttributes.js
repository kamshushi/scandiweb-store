import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class CartProductAttributes extends PureComponent {
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
            const { id, value } = item;
            return (
              <li
                key={id}
                className={`option ${type === "swatch" ? "swatch" : ""} ${
                  userSelection[name] === value ? "active" : ""
                }`}
                style={type === "swatch" ? { backgroundColor: value } : {}}
              >
                {type === "swatch" ? (
                  userSelection[name] === value ? (
                    <div className="selected-overlay">✓</div>
                  ) : (
                    ""
                  )
                ) : (
                  value
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
