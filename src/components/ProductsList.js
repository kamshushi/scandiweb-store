import React, { Component } from "react";
import { client, Query, Field, InlineFragment } from "@tilework/opus";
import { connect } from "react-redux";
import store from "../redux/store";

client.setEndpoint("http://localhost:4000");
const query = new Query("category", true)
  .addField(new Field("name", true))
  .addField(
    new Field("products", true)
      .addFieldList(["name", "inStock", "gallery"])
      .addField(
        new Field("attributes", true).addFieldList(["id", "name", "type"])
      )
  );

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

class ProductsList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    client
      .post(query)
      .then((res) => {
        console.log(res.category.products);
        // this.setState({ products: res.category.products });
        store.dispatch({
          type: "SET_PRODUCTS",
          payload: res.category.products,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <section className="products-contaier">
        {this.props.products ? (
          this.props.products.map((product) => {
            return (
              <div key={product.name} className="product-container">
                <img src={product.gallery[0]} alt="img" />
              </div>
            );
          })
        ) : (
          <p>LOADING</p>
        )}
      </section>
    );
  }
}

export default connect(mapStateToProps)(ProductsList);
