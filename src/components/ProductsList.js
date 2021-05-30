import React, { Component } from "react";
import { client, Query, Field, InlineFragment } from "@tilework/opus";
import "../styles/productsList.css";
//Redux
import { connect } from "react-redux";
import store from "../redux/store";
import { getProducts } from "../redux/actions";

// client.setEndpoint("http://localhost:4000");
// const query = new Query("category", true)
//   .addField(new Field("name", true))
//   .addField(
//     new Field("products", true)
//       .addFieldList(["name", "inStock", "gallery", "description", "category"])
//       .addField(
//         new Field("attributes", true)
//           .addFieldList(["id", "name", "type"])
//           .addField(
//             new Field("items", true).addFieldList([
//               "displayValue",
//               "value",
//               "id",
//             ])
//           )
//       )
//       .addField(new Field("prices", true).addFieldList(["currency", "amount"]))
//   );

class ProductsList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProducts();
    // client
    //   .post(query)
    //   .then((res) => {
    //     console.log(res.category);
    //     store.dispatch({
    //       type: "SET_PRODUCTS",
    //       payload: res.category,
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }
  render() {
    const { products, loading } = this.props;
    console.log(loading);
    return (
      <section className="products-container">
        {!loading ? (
          products &&
          products.map((product) => {
            return (
              <div key={product.name} className="product-container">
                <div className="img-holder">
                  <img src={product.gallery[0]} alt="img" />
                </div>
                <p className="product-name">{product.name}</p>
                <p className="product-price">${product.prices[0].amount}</p>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    loading: state.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(getProducts()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
