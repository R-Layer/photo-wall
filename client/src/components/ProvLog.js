import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { authProcess } from "./../redux/types";

class ProvLog extends Component {
  render() {
    const token = this.props.location.search.substring(1);
    localStorage.setItem("authToken", "Bearer " + token);
    this.props.login(token);

    return (
      <div>
        <Redirect to="/" />;
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: token =>
    dispatch({
      type: authProcess.LOGIN,
      loggedUser: { token }
    })
});

export default connect(
  null,
  mapDispatchToProps
)(ProvLog);
