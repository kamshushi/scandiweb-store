import React, { Component } from "react";
import styled from "styled-components";
import "../styles/navbar.css";
//util
import StoreLogo from "../util/Brand icon.svg";
import CurrencyLogo from "../util/Currency.png";
import CartLogo from "../util/Cart.svg";
// const Nav = styled.div`
//   background-color: black;
//   height: 80px;
//   display: flex;
//   justfiy-conent: space-between;
// `;
// const Categories = styled.div``;

// const Logo = styled.div``;
// const Actions = styled.div``;

export default class Navbar extends Component {
  render() {
    return (
      <div className="nav-container">
        <ul className="categories">
          <li>women</li>
          <li>men</li>
          <li>kids</li>
        </ul>
        <div className="logo">
          <img src={StoreLogo} alt="logo" />
        </div>
        <div className="actions">
          <img className="currency" src={CurrencyLogo} alt="currency" />
          <img className="cart" src={CartLogo} alt="cart" />
        </div>
      </div>
    );
  }
}
