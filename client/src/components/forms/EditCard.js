import React, { Component } from "react";
import { connect } from "react-redux";
/* import { updateCardAction } from "../../redux/actions/cardActions"; */

class EditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      imageName: "",
      imageTagline: ""
    };
  }

  componentDidUpdate() {
    if (this.props.visible && !this.state.active) {
      this.setState({
        active: true,
        imageName: this.props.card.imageName,
        imageTagline: this.props.card.imageTagline
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const data = {
      imageName: this.state.imageName,
      imageTagline: this.state.imageTagline
    };
    this.props.toUpdate(
      this.props.card._id,
      data
    ); /* .then(el => {
      if (Object.keys(this.props.errors).length === 0) return this.closeModal();
    }); */
    this.closeModal();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  closeModal = () => {
    this.setState({
      active: false,
      imageName: "",
      imageTagline: ""
    });
    this.props.onClose();
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
      <div className={`modal ${this.state.active ? "is-active" : ""}`}>
        <div className="modal-background" onClick={this.closeModal} />
        <div className="modal-content">
          <article className="message">
            <form className="CST_frame" onSubmit={this.onSubmit} noValidate>
              <div className="field">
                <label className="label">Image name</label>
                <div className="control">
                  <input
                    className={
                      spreadErr.imageName ? "input is-danger" : "input"
                    }
                    type="text"
                    placeholder="landscape"
                    name="imageName"
                    value={this.state.imageName}
                    onChange={this.onChange}
                  />
                </div>
                {spreadErr.imageName &&
                  spreadErr.imageName.map(err => (
                    <p className="help is-danger" key={err}>
                      {err}
                    </p>
                  ))}
              </div>
              <div className="field">
                <label className="label">Image tagline</label>
                <div className="control">
                  <input
                    className={
                      spreadErr.imageTagline ? "input is-danger" : "input"
                    }
                    type="text"
                    placeholder="A winter forest landscape"
                    name="imageTagline"
                    value={this.state.imageTagline}
                    onChange={this.onChange}
                  />
                </div>
                {spreadErr.imageTagline &&
                  spreadErr.imageTagline.map(err => (
                    <p className="help is-danger" key={err}>
                      {err}
                    </p>
                  ))}
              </div>

              <div className="buttons">
                <button type="submit" className="button is-success">
                  Save new data
                </button>
              </div>
            </form>
          </article>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.closeModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  /* updateCard: (id, data) => dispatch(updateCardAction(id, data)) */
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCard);
