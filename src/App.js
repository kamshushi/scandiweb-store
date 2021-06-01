//React stuff
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
//Redux
import { Provider, connect } from "react-redux";
import store from "./redux/store";
import { getProducts } from "./redux/actions";
//components
import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductsList";
import Product from "./components/Product";
//styles
import "./App.css";

//App Container
const Container = styled.div`
  width: 86.11%;
  margin: auto;
`;
class App extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Container>
            <Navbar />
            <Route exact path="/" component={ProductsList} />
            <Route exact path="/product/:name" component={Product} />
          </Container>
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
