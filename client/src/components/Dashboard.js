import React, { Component } from "react";

import Navbar from "./Navbar";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getCardsAction } from "../redux/actions/cardActions";
import { logoutAction } from "../redux/actions/userActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCards(this.props.history);
  }

  render() {
    const { auth, cards, logout } = this.props;
    console.log("cards", cards);
    const cardEls = cards.map(card => (
      <div className="card CST_capped" key={card.imageName}>
        <div className="card-image">
          <figure className="image">
            <img src={card.imageURL} alt="Placeholder" />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-4">{card.imageName}</p>
          <p className="subtitle is-6">{card.imageTagline}</p>
        </div>
      </div>
    ));

    return (
      <div>
        <Navbar isAuthenticated={auth.isAuthenticated} logout={logout} />
        {cardEls}
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
  errors: state.errors,
  cards: state.cardStatus
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
  getCards: history => dispatch(getCardsAction(history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
