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
import { getUserAction, logoutAction } from "../redux/actions/userActions";

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
    this.props.getCards(this.props.auth.user.id);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props
      .getUser(this.state.activeUser)
      .then(el => this.props.getCards(el._id));
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

  render() {
    const { auth, cards, errors, logout } = this.props;
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

    return (
      <div>
        <Navbar isAuthenticated={auth.isAuthenticated} logout={logout} />
        <form className="CST_h-padded" onSubmit={this.onSubmit}>
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
        </form>
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
  errors: state.errors,
  cards: state.cardStatus
});

const mapDispatchToProps = dispatch => ({
  getUser: name => dispatch(getUserAction(name)),
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

/* 

User Story: As an unauthenticated user, I can login with GitHub.
User Story: As an authenticated user, I can link to images.
User Story: As an authenticated user, I can delete images that I've linked to.
User Story: As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.
User Story: As an unauthenticated user, I can browse other users' walls of images.
User Story: As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image. (can use jQuery broken image detection)

*/
