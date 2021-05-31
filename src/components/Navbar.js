import React, { Component } from "react";
import styled from "styled-components";
import "../styles/navbar.css";
//util
import StoreLogo from "../icons/Brand icon.svg";
import CurrencyLogo from "../icons/Currency.png";
import CartLogo from "../icons/Cart.svg";
//redux
import { connect } from "react-redux";
import store from "../redux/store";
import { SET_CATEGORY } from "../redux/actionTypes";
// const Nav = styled.div`
//   background-color: black;
//   height: 80px;
//   display: flex;
//   justfiy-conent: space-between;
// `;
// const Categories = styled.div``;

// const Logo = styled.div``;
// const Actions = styled.div``;

const setCategory = (e) => {
  store.dispatch({ type: SET_CATEGORY, payload: e.target.id });
};
class Navbar extends Component {
  render() {
    const { categories, currencies } = this.props;
    return (
      <nav className="nav-container">
        <ul className="categories">
          {/* <li id="clothes" onClick={setCategory}>
            clothes
          </li>
          <li id="tech" onClick={setCategory}>
            tech
          </li> */}
          {categories &&
            categories.map((category) => {
              return (
                <li id={category} onClick={setCategory}>
                  {category}
                </li>
              );
            })}
        </ul>
        <div className="logo">
          <img src={StoreLogo} alt="logo" />
        </div>
        <div className="actions">
          <img className="currency" src={CurrencyLogo} alt="currency" />
          <img className="cart" src={CartLogo} alt="cart" />
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  const currencies =
    state.products && state.products[0].prices.map((price) => price.currency);
  const allCategories =
    state.products && state.products.map((product) => product.category);
  const uniqueCategories = [...new Set(allCategories)];
  console.log(uniqueCategories);
  return {
    currencies: currencies,
    categories: uniqueCategories,
  };
};
export default connect(mapStateToProps)(Navbar);
