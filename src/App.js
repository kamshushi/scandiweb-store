//React stuff
import React, { Component } from "react";
import styled from "styled-components";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
//components
import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductsList";
//styles
import "./App.css";

//App Container
const Container = styled.div`
  width: 86.11%;
  margin: auto;
`;
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Container>
            <Navbar />
            <h1 className="main-header">Category name</h1>
            <ProductsList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
