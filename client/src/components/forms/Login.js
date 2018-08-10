import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loginAction,
  githubAuth,
  logoutAction
} from "../../redux/actions/userActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.loginUser(this.state, this.props.history);
  };

  onGitAuth = e => {
    this.props.gitAuth();
  };

  render() {
    const { authState, errors } = this.props;
    let spreadErr = {};
    if (errors.isJoi) {
      errors.details.map(err => {
        return spreadErr.hasOwnProperty(err.context.key)
          ? spreadErr[err.context.key].push(err.message.replace(/"/g, ""))
          : (spreadErr[err.context.key] = [err.message.replace(/"/g, "")]);
      });
    }

    return (
      <div className="CST_fullHeight ">
        {authState.message &&
          !errors.message && (
            <div className="notification is-success has-text-centered CST_frame">
              {authState.message}
            </div>
          )}
        {errors.message && (
          <div className="notification is-danger has-text-centered CST_frame">
            {errors.message}
          </div>
        )}
        <div
          className={`columns is-vcentered is-centered ${
            errors.message || authState.message ? "" : "CST_fullHeight"
          }`}
        >
          <div className="column is-8-desktop is-10-tablet">
            <form className="CST_frame" onSubmit={this.onSubmit} noValidate>
              <h1 className="title is-1 has-text-centered CST_titleThrough">
                Login
              </h1>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
                  <input
                    className={spreadErr.email ? "input is-danger" : "input"}
                    type="email"
                    placeholder="Email input"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                </div>
                {spreadErr.email &&
                  spreadErr.email.map(err => (
                    <p className="help is-danger" key={err}>
                      {err}
                    </p>
                  ))}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left">
                  <input
                    className={spreadErr.password ? "input is-danger" : "input"}
                    type="password"
                    placeholder="P4$$w0Rd@@15"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock" />
                  </span>
                </div>
                {spreadErr.password &&
                  spreadErr.password.map(err => (
                    <p className="help is-danger" key={err}>
                      {err}
                    </p>
                  ))}
              </div>

              <div className="buttons">
                <button type="submit" className="button is-success">
                  Log in
                </button>
              </div>
              <p className="has-text-centered">
                <a href="http://localhost:5000/api/users/auth/github">
                  {" "}
                  Login with github
                </a>
              </p>

              <p className="has-text-centered">
                Doesn't have an account? <br />
                <a href="/register"> Register now!</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  authState: state.authState
});

const mapDispatchToProps = dispatch => ({
  loginUser: (userData, history) => dispatch(loginAction(userData, history)),
  gitAuth: (userData, history) => dispatch(githubAuth(userData, history)),
  logout: () => dispatch(logoutAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
