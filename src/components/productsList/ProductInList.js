import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// icons
import CircleIcon from "../../icons/Circle Icon.svg";
// util
import getCurrencySymbol from "../../util/getCurrencySymbol";

class ProductInList extends Component {
  render() {
    const {
      product: { id, inStock, gallery, name, prices },
      currencyIndex,
    } = this.props;
    const currencySymbol = getCurrencySymbol(prices[currencyIndex].currency);
    return (
      <div key={id} className="product-container">
        <Link to={`/product/${id}`}>
          <div className={`out-of-stock ${!inStock && "show"}`}>
            <p>out of stock</p>
          </div>
        </Link>
        <Link to={`/product/${id}`}>
          <div className="img-holder">
            <img className="img" src={gallery[0]} alt="img" />
            <img className="icon" src={CircleIcon} alt="img" />
          </div>
          <p className="product-name">{name}</p>
          <p className="product-price">
            {`${currencySymbol} ${prices[currencyIndex].amount}`}
          </p>
        </Link>
      </div>
    );
  }
}
ProductInList.propTypes = {
  product: PropTypes.object.isRequired,
  currencyIndex: PropTypes.number.isRequired,
};

export default ProductInList;
