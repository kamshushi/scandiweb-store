import { SET_LOADING, SET_PRODUCTS, STOP_LOADING } from "./actionTypes";
import { client } from "@tilework/opus";
import { categoryQuery } from "../util/graphqlQuery";

export const getProducts = () => (dispatch) => {
  dispatch({ type: SET_LOADING });
  client
    .post(categoryQuery)
    .then((res) => {
      console.log(res.category);
      dispatch({ type: SET_PRODUCTS, payload: res.category });
      dispatch({ type: STOP_LOADING });
    })
    .catch((err) => {
      dispatch(STOP_LOADING);
      console.log(err);
    });
};
