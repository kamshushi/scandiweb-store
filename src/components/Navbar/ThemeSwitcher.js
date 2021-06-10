import React, { Component } from "react";

export class ThemeSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: getStorageTheme(),
    };
  }
  toggleTheme = () => {
    const state = this.state;
    if (state.theme === "light-theme") {
      this.setState({
        ...state,
        theme: "dark-theme",
      });
    } else {
      this.setState({
        ...state,
        theme: "light-theme",
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.className = this.state.theme;
      localStorage.setItem("theme", this.state.theme);
    }
  }
  componentDidMount() {
    document.documentElement.className = this.state.theme;
  }
  render() {
    return (
      <span onClick={this.toggleTheme} className="dark-mode-icon">
        &#x263d;
      </span>
    );
  }
}
// Get Theme from local storage
const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

export default ThemeSwitcher;
