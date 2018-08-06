import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  // --------------------------------------------
  // OutsideClick check: Credits to  Paul Fitzgerald [STACK OVERFLOW]

  navStateHandler = event => {
    const hamburgerMenu = this.node;
    if (hamburgerMenu && !hamburgerMenu.contains(event.target)) {
      this.setState({
        isActive: false
      });
    }
  };

  componentDidMount = () => {
    document.addEventListener("click", this.navStateHandler);
  };

  componentWillUnmount = () => {
    document.removeEventListener("click", this.navStateHandler);
  };

  // -----------------------------------------------

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { isAuthenticated, location } = this.props;
    const { isActive } = this.state;
    return (
      <nav className="navbar is-fixed-top" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="navbar-item" onClick={this.props.homeWall}>
            <i className="fas fa-home" />
          </span>
          <div
            className={isActive ? "navbar-burger is-active" : "navbar-burger"}
            data-target="navMenu"
            onClick={() => this.setState({ isActive: !this.state.isActive })}
            ref={node => (this.node = node)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          className={isActive ? "navbar-menu is-active" : "navbar-menu"}
          id="navMenu"
        >
          {isAuthenticated ? (
            <div className="navbar-end">
              {location.pathname === "/control-panel" ? (
                <NavLink className="navbar-item" to="/">
                  Dashboard
                </NavLink>
              ) : (
                <NavLink className="navbar-item" to="/control-panel">
                  Control Panel
                </NavLink>
              )}
              <NavLink className="navbar-item" to="/settings">
                Settings
              </NavLink>
              {!isActive && (
                <span className="navbar-item" aria-label="divider">
                  {" "}
                  |{" "}
                </span>
              )}
              <div
                className="navbar-item CST_clickable"
                onClick={this.handleLogout}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="navbar-end">
              <NavLink className="navbar-item" to="/login">
                Login
              </NavLink>
              <NavLink className="navbar-item" to="/register">
                Signup
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default withRouter(Navbar);
