import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// components
import MiniCartProductInfo from "./MiniCartProductInfo";
import ProductRightSide from "./ProductRightSide";
import BottomButtons from "./BottomButtons";
//redux
import { connect } from "react-redux";
//styles
import "../../../styles/miniCart.css";
//util
import getCurrencySymbol from "../../../util/getCurrencySymbol";
import calculateTotal from "../../../util/calculateTotal";
import calculateTotalProducts from "../../../util/calculateTotalProducts";

class MiniCart extends PureComponent {
  render() {
    const { products, currencyIndex, allProducts } = this.props;
    const currentCurrency = allProducts[0]
      ? getCurrencySymbol(allProducts[0].prices[currencyIndex].currency)
      : "$";
    return (
      // MiniCart container
      <div className="minicart-container">
        <h1>
          My Bag,
          <span>
            {` ${calculateTotalProducts(products)}`}{" "}
            {calculateTotalProducts(products) === 1 ? "item" : "items"}
          </span>
        </h1>
        {/* Products List */}
        {products.map((product) => {
          const { gallery, quantity, timeAdded } = product;

          return (
            <div key={timeAdded} className="product">
              {/* Product info */}
              <MiniCartProductInfo
                product={product}
                currentCurrency={currentCurrency}
                currencyIndex={currencyIndex}
              />
              {/* Image and quantity buttons */}
              <ProductRightSide
                product={product}
                quantity={quantity}
                gallery={gallery}
              />
            </div>
          );
        })}
        {/* Total price */}
        <div className="total-price">
          <p className="total">Total</p>
          <p className="price">{`${currentCurrency} ${calculateTotal(
            products,
            currencyIndex
          )}`}</p>
        </div>
        {/* Bottom buttons */}
        {/* <div className="bottom-buttons">
          <Link onClick={hideMiniCart} className="view-bag" to="/cart">
            <button>view bag</button>
          </Link>
          <button className="check-out">check out</button>
        </div> */}
        <BottomButtons />
      </div>
    );
  }
}
// PropTypes
MiniCart.propTypes = {
  allProducts: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  currencyIndex: PropTypes.number.isRequired,
};

// Map state and dispatch to props
const mapStateToProps = (state) => {
  return {
    allProducts: state.products.products,
    products: state.cart.products,
    currencyIndex: state.products.currencyIndex,
  };
};
export default connect(mapStateToProps)(MiniCart);
