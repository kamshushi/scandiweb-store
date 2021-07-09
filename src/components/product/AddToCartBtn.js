import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { CHANGE_SHOW_MINICART, ADD_TO_CART } from "../../redux/actionTypes";

export class AddToCartBtn extends PureComponent {
  render() {
    const {
      inStock,
      infoSelected,
      attributes,
      addToCart,
      currentProductWithInfo,
      displayMiniCart,
    } = this.props;
    return (
      <Fragment>
        {inStock ? (
          Object.keys(infoSelected).length === attributes.length ? (
            <button
              onClick={() => {
                addToCart(currentProductWithInfo);
                displayMiniCart();
                window.scrollTo(0, 0);
              }}
              className="add-to-cart"
            >
              add to cart
            </button>
          ) : (
            <div>
              <button
                onClick={(e) =>
                  (e.target.parentElement.lastChild.style = "display:block")
                }
                className="add-to-cart"
              >
                add to cart
              </button>
              <p style={{ display: "none" }} className="error-text">
                Please select your preferred options
              </p>
            </div>
          )
        ) : (
          <button disabled className="add-to-cart out-of-stock-button">
            out of stock
          </button>
        )}
      </Fragment>
    );
  }
}

AddToCartBtn.propTypes = {
  inStock: PropTypes.bool.isRequired,
  infoSelected: PropTypes.object.isRequired,
  attributes: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  currentProductWithInfo: PropTypes.object.isRequired,
  displayMiniCart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayMiniCart: (e) => {
      dispatch({ type: CHANGE_SHOW_MINICART, payload: true });
    },
    addToCart: (product) => dispatch({ type: ADD_TO_CART, payload: product }),
  };
};

export default connect(null, mapDispatchToProps)(AddToCartBtn);
