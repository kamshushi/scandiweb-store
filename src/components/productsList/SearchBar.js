import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class SearchBar extends PureComponent {
  render() {
    const { setSearchTerm } = this.props;
    return (
      <div className="search-bar">
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="text"
          name="search"
          placeholder="Search.."
        />
      </div>
    );
  }
}
SearchBar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
