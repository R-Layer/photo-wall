import React, { Component } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import { registerAction } from "../../redux/actions/userActions";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      location: "",
      password: "",
      password2: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.registerUser(this.state, this.props.history);
  };

  render() {
    const { errors } = this.props;
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
        {errors.message && (
          <div className="notification is-danger has-text-centered CST_frame">
            {errors.message}
          </div>
        )}
        <div
          className={`columns is-vcentered is-centered ${
            errors.message ? "" : "CST_fullHeight"
          }`}
        >
          <div className="column  is-8-desktop is-10-tablet">
            <form className="CST_frame" onSubmit={this.onSubmit} noValidate>
              <h1 className="title is-1 has-text-centered CST_titleThrough">
                Register
              </h1>
              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left">
                  <input
                    className={spreadErr.name ? "input is-danger" : "input"}
                    type="text"
                    placeholder="iAmACoolDog"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </div>
                {spreadErr.name &&
                  spreadErr.name.map(err => (
                    <p className="help is-danger" key={err}>
                      {err}
                    </p>
                  ))}
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
                  <input
                    className={spreadErr.email ? "input is-danger" : "input"}
                    type="email"
                    placeholder="coolDog@woof.com"
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
                <label className="label">Default location</label>
                <div className="control has-icons-left">
                  <input
                    className={spreadErr.location ? "input is-danger" : "input"}
                    type="text"
                    placeholder="34 rue Montmartre, Paris"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map" />
                  </span>
                </div>
                {spreadErr.location &&
                  spreadErr.location.map(err => (
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
              <div className="field">
                <label className="label">Confirm password</label>
                <div className="control has-icons-left">
                  <input
                    className={
                      spreadErr.password2 ? "input is-danger" : "input"
                    }
                    type="password"
                    placeholder="P4$$w0Rd@@15"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock" />
                  </span>
                </div>
                {spreadErr.password2 &&
                  spreadErr.password2.map(err => (
                    <p className="help is-danger" key={err}>
                      {err}
                    </p>
                  ))}
              </div>

              <div className="buttons">
                <button type="submit" className="button is-success">
                  Sign up
                </button>
              </div>

              <p className="has-text-centered">
                Already have an account? <br />
                <a href="/login"> Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  registerUser: (userData, history) =>
    dispatch(registerAction(userData, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
