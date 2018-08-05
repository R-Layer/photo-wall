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
import { logoutAction } from "../redux/actions/userActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      activeCard: {}
    };
  }

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

  componentDidMount() {
    this.props.getCards();
  }

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
        <StackGrid columnWidth={250} className="CST_grid-container">
          {cardEls}
        </StackGrid>
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
  logout: () => dispatch(logoutAction()),
  getCards: history => dispatch(getCardsAction(history)),
  updateCard: (id, data) => dispatch(updateCardAction(id, data)),
  deleteCard: id => dispatch(removeCardAction(id)),
  toggleLike: id => dispatch(toggleLikeAction(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
