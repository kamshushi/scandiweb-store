import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class MiniCartProductInfo extends PureComponent {
  render() {
    const {
      product: { name, prices, attributes, userSelection },
      currentCurrency,
      currencyIndex,
    } = this.props;
    const productPrice = prices[currencyIndex].amount.toFixed(2);

    return (
      <div className="product-info">
        <h3>{name.split(" ")[0]}</h3>
        {name.split(" ").length !== 1 && (
          <p>{name.substr(name.indexOf(" ") + 1)}</p>
        )}
        <strong>{`${currentCurrency} ${productPrice}`}</strong>
        {attributes.map((attribute) => {
          return (
            <ul key={attribute.id} className="attributes">
              <h6>{attribute.name}</h6>
              {attribute.items.map((item) => (
                <li
                  key={item.id}
                  className={`
                          ${attribute.type === "swatch" ? "swatch" : ""}
                          ${
                            userSelection[attribute.name] === item.value
                              ? "active"
                              : ""
                          }`}
                  style={
                    attribute.type === "swatch"
                      ? { backgroundColor: item.value }
                      : {}
                  }
                >
                  {attribute.type === "swatch" ? "" : item.value}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    );
  }
}
MiniCartProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
  currentCurrency: PropTypes.string.isRequired,
  currencyIndex: PropTypes.number.isRequired,
};

export default MiniCartProductInfo;
