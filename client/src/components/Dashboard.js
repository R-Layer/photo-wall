import React, { Component } from "react";

import StackGrid from "react-stack-grid";
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

  onClick = data => {
    console.log("target", data);
  };

  render() {
    const { auth, cards, logout } = this.props;
    const cardEls = cards.map(card => (
      <figure
        className="CST_card"
        key={card._id}
        onClick={() => this.onClick(card)}
      >
        <img src={card.imageURL} alt="Placeholder" className="CST_raw" />
        <figcaption className="CST_tooltip">
          <h4 className="title is-4">{card.imageName}</h4>
          <h6 className="subtitle is-6">{card.imageTagline}</h6>
        </figcaption>
      </figure>
    ));

    return (
      <div>
        <Navbar isAuthenticated={auth.isAuthenticated} logout={logout} />
        <StackGrid columnWidth={250} className="CST_grid-container">
          {cardEls}
        </StackGrid>
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
