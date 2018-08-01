import React, { Component } from "react";

import Navbar from "./Navbar";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutAction } from "../redux/actions/userActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { auth, logout } = this.props;
    return (
      <div>
        <Navbar isAuthenticated={auth.isAuthenticated} logout={logout} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.authState,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
