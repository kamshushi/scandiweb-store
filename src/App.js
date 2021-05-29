//React stuff
import React, { Component } from "react";
import styled from "styled-components";
//components
import Navbar from "./components/Navbar";
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
      <div className="App">
        <Container>
          <Navbar />
          <h1 className="main-header">Category name</h1>
        </Container>
      </div>
    );
  }
}

export default App;
