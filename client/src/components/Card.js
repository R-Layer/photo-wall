import React, { Component } from "react";

class Card extends Component {
  render() {
    const { card, user } = this.props;
    return (
      <figure className="CST_card" id={card._id}>
        <img src={card.imageURL} alt="Placeholder" className="CST_raw" />
        <figcaption className="CST_tooltip">
          <h4 className="title is-4">{card.imageName}</h4>
          <h6 className="subtitle is-6">{card.imageTagline}</h6>
          {user.id === card.owner ? (
            <footer>
              <span className="icon" onClick={this.props.onRemove}>
                <i className="fas fa-trash" />
              </span>
              <span className="icon" onClick={this.props.onEdit}>
                <i className="fas fa-pencil-alt" />
              </span>
            </footer>
          ) : (
            <footer>
              <span className="icon" onClick={this.props.onVote}>
                <i className="fas fa-heart" />
              </span>
              <span className="icon">
                <i className="far fa-heart" />
              </span>
            </footer>
          )}
        </figcaption>
      </figure>
    );
  }
}

export default Card;
