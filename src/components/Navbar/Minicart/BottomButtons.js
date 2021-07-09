import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { CHANGE_SHOW_MINICART } from "../../../redux/actionTypes";

export class BottomButtons extends PureComponent {
  render() {
    const { hideMiniCart } = this.props;
    return (
      <div className="bottom-buttons">
        <Link onClick={hideMiniCart} className="view-bag" to="/cart">
          <button>view bag</button>
        </Link>
        <button className="check-out">check out</button>
      </div>
    );
  }
}

BottomButtons.propTypes = {
  hideMiniCart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideMiniCart: () =>
      dispatch({ type: CHANGE_SHOW_MINICART, payload: false }),
  };
};
export default connect(null, mapDispatchToProps)(BottomButtons);
