//React stuff
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getProducts } from "./redux/actions";
//components
import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductsList";
import Product from "./components/Product";
import Cart from "./components/Cart";
//styles
import "./App.css";

//App Container

class App extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div className="app-container">
            <Navbar />
            <Switch>
              <Route exact path="/" component={ProductsList} />
              <Route exact path="/product/:name" component={Product} />
              <Route exact path="/cart" component={Cart} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(getProducts()),
  };
};
export default connect(null, mapDispatchToProps)(App);
