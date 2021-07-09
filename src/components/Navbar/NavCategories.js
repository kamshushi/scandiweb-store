import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { SET_CATEGORY } from "../../redux/actionTypes";

class NavCategories extends PureComponent {
  render() {
    const { loading, categories, currentCategory, setCategory } = this.props;
    return (
      !loading && (
        <div className="categories">
          <Link to="/">
            <div
              className={currentCategory === "all" ? "active" : ""}
              id="all"
              onClick={setCategory}
            >
              all
            </div>
          </Link>
          {categories.map((category, index) => {
            return (
              <Link key={index} to="/">
                <div
                  className={currentCategory === category ? "active" : ""}
                  id={category}
                  onClick={setCategory}
                >
                  {category}
                </div>
              </Link>
            );
          })}
        </div>
      )
    );
  }
}
NavCategories.propTypes = {
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  currentCategory: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  const { products } = state.products;
  const allCategories = products && products.map((product) => product.category);
  const uniqueCategories = [...new Set(allCategories)];
  return {
    loading: state.products.loading,
    categories: uniqueCategories,
    currentCategory: state.products.currentCategory,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    //Set current category
    setCategory: (e) => {
      dispatch({ type: SET_CATEGORY, payload: e.target.id });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavCategories);
