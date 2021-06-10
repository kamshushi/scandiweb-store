import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }
  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.searchValue}
          onChange={(e) =>
            this.setState({ ...this.state, searchValue: e.target.value })
          }
          type="text"
          name="search"
          placeholder="Search.."
        />
      </div>
    );
  }
}

export default SearchBar;
