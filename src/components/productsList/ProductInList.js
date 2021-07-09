import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { CHANGE_SHOW_MINICART, ADD_TO_CART } from "../../redux/actionTypes";

// icons
import CircleIcon from "../../icons/Circle Icon.svg";
// util
import getCurrencySymbol from "../../util/getCurrencySymbol";

class ProductInList extends PureComponent {
  handleClickOnCartIcon = (e, attributes) => {
    if (attributes.length < 1) {
      const { product, addToCart, displayMiniCart } = this.props;
      const productWithInfo = Object.assign(
        { quantity: 1, userSelection: {} },
        product
      );
      e.preventDefault();
      addToCart(productWithInfo);
      displayMiniCart();
      window.scrollTo(0, 0);
    }
  };
  render() {
    const {
      product: { id, inStock, gallery, name, prices, attributes },
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
            <img
              className={`icon ${!inStock && "hide"}`}
              src={CircleIcon}
              alt="img"
              onClick={(e) => this.handleClickOnCartIcon(e, attributes)}
            />
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

const mapDispatchToProps = (dispatch) => {
  return {
    displayMiniCart: (e) => {
      dispatch({ type: CHANGE_SHOW_MINICART, payload: true });
    },
    addToCart: (product) => dispatch({ type: ADD_TO_CART, payload: product }),
  };
};

export default connect(null, mapDispatchToProps)(ProductInList);
