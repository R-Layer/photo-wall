import React, { Component } from "react";

class Card extends Component {
  /* credits to: epascarello [STACK OVERFLOW]*/
  checkImage(src, newSrc) {
    const img = new Image();
    img.onload = function() {
      img.src = src;
      return img.src;
    };
    img.onerror = function() {
      img.src = newSrc;
      return img.src;
    };
  }

  /* credits to: eltonkamami [STACK OVERFLOW] */
  addDefaultSrc = e => {
    e.target.src = "uploads/placeholder.jpeg";
  };

  render() {
    const { card, user } = this.props;

    return (
      <figure className="CST_card" id={card._id}>
        <img
          src={card.imageURL}
          onError={this.addDefaultSrc}
          alt="Placeholder"
          className="CST_raw"
        />
        <figcaption className="CST_tooltip">
          <h4 className="title is-4">{card.imageName}</h4>
          <h6 className="subtitle is-6">{card.imageTagline}</h6>
          {user &&
            (user.id === card.owner ? (
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
                {card.likesArray.includes(user.id) ? (
                  <div>
                    <span className="icon" onClick={this.props.onVote}>
                      <i className="fas fa-heart" />
                    </span>
                  </div>
                ) : (
                  <span className="icon" onClick={this.props.onVote}>
                    <i className="far fa-heart" />
                  </span>
                )}
              </footer>
            ))}
        </figcaption>
      </figure>
    );
  }
}

export default Card;
