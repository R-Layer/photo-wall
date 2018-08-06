import React, { Component } from "react";

import StackGrid from "react-stack-grid";
import EditCard from "./forms/EditCard";
import Card from "./Card";
import Navbar from "./Navbar";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getCardsAction,
  removeCardAction,
  updateCardAction,
  toggleLikeAction
} from "../redux/actions/cardActions";
import {
  getUserAction,
  getUsersAction,
  logoutAction
} from "../redux/actions/userActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      activeCard: {},
      activeUser: ""
    };
  }

  componentDidMount() {
    this.props.getUsers();
    if (this.props.auth.isAuthenticated) {
      this.props.getCards(this.props.auth.user.id);
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.getUser(this.state.activeUser).then(foundUser => {
      if (foundUser.err) {
        return;
      } else {
        return this.props.getCards(foundUser._id);
      }
    });
  };

  onEdit = e => {
    let activeCard = this.props.cards.filter(
      card => card._id === e.target.closest(".CST_card").id
    )[0];
    this.setState({
      editing: true,
      activeCard
    });
  };

  onClose = () => {
    this.setState({
      editing: false,
      activeCard: {}
    });
  };

  handleRemove = id => {
    this.props.deleteCard(id);
  };

  handleEdit = (id, data) => this.props.updateCard(id, data);

  resetWall = () => {
    if (this.props.auth.isAuthenticated) {
      this.props
        .getUser(this.props.auth.user.name)
        .then(el => this.props.getCards(el._id));
    }
  };

  render() {
    const { auth, users, cards, errors, logout } = this.props;
    const cardEls = cards.map(card => (
      <Card
        user={this.props.auth.user}
        key={card._id}
        card={card}
        onRemove={() => this.handleRemove(card._id)}
        onVote={() => this.props.toggleLike(card._id)}
        onEdit={this.onEdit}
      />
    ));

    const lastUsers = users.map((user, ind) => {
      if (ind < 3) {
        return <li key={user._id}>{user.name}</li>;
      } else {
        return null;
      }
    });

    return (
      <div>
        <Navbar
          isAuthenticated={auth.isAuthenticated}
          logout={logout}
          homeWall={this.resetWall}
        />
        <form className="CST_h-padded" onSubmit={this.onSubmit}>
          <div className="help">
            <ul> Latest registered users: {lastUsers}</ul>
          </div>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                name="activeUser"
                onChange={this.onChange}
                value={this.state.activeUser}
                placeholder="Find a user wall"
              />
            </div>
            <div className="control">
              <input
                className="button is-info"
                type="submit"
                value="Search user"
              />
            </div>
          </div>
          {errors && <p className="help">{errors.message}</p>}
        </form>
        <hr />
        <StackGrid columnWidth={250}>{cardEls}</StackGrid>
        <EditCard
          card={this.state.activeCard}
          errors={errors}
          toUpdate={this.handleEdit}
          visible={this.state.editing}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  getCards: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.authState,
  users: state.users,
  errors: state.errors,
  cards: state.cardStatus
});

const mapDispatchToProps = dispatch => ({
  getUser: name => dispatch(getUserAction(name)),
  getUsers: () => dispatch(getUsersAction()),
  logout: () => dispatch(logoutAction()),
  getCards: id => dispatch(getCardsAction(id)),
  updateCard: (id, data) => dispatch(updateCardAction(id, data)),
  deleteCard: id => dispatch(removeCardAction(id)),
  toggleLike: id => dispatch(toggleLikeAction(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
