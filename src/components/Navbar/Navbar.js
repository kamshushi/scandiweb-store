import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
// Components
import CurrenciesDropDown from "./CurrenciesDropdown";
import MiniCartHolder from "./Minicart/MiniCartHolder";
import NavCategories from "./NavCategories";
import ThemeSwitcher from "./ThemeSwitcher";
//icons
import StoreLogo from "../../icons/Brand icon.svg";
// Styles
import "../../styles/navbar.css";

class Navbar extends PureComponent {
  render() {
    return (
      <nav className="nav-container">
        {/* Categories */}
        <NavCategories />
        {/* Store logo */}
        <div className="logo">
          <Link to="/">
            <img src={StoreLogo} alt="logo" />
          </Link>
        </div>
        {/* Actions */}
        <div className="actions">
          <ThemeSwitcher />
          <CurrenciesDropDown />
          <MiniCartHolder />
        </div>
      </nav>
    );
  }
}

export default Navbar;
