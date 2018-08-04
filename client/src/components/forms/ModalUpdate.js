import React, { Component } from "react";

import PropTypes from "prop-types";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      title: "",
      exchange: false
    };
  }

  componentDidUpdate() {
    if (this.props.visible && !this.state.active) {
      this.setState({
        title: this.props.book.title,
        exchange: this.props.book.bookStatus.exchangeable,
        active: true
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCheck = e => {
    this.setState({
      exchange: e.target.checked
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.updateBook(
      {
        title: this.state.title,
        exchangeable: this.state.exchange
      },
      this.props.book._id
    );
    this.close();
  };

  close = () => {
    this.setState({
      active: false
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
        <div className="modal-background" onClick={this.close} />
        <div className="modal-content">
          <article className="message">
            <form className="section" onSubmit={this.onSubmit} noValidate>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    placeholder="The fifth day"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <div className="control">
                  <button type="submit" className="button is-success">
                    save
                  </button>
                </div>
              </div>
              {spreadErr.title &&
                spreadErr.title.map(err => (
                  <p className="help has-text-centered is-danger" key={err}>
                    {err}
                  </p>
                ))}
              <div>
                <input
                  type="checkbox"
                  id="share"
                  value="share"
                  onChange={this.onCheck}
                  checked={this.state.exchange ? "checked" : ""}
                />
                <label htmlFor="share"> exchangeable</label>
              </div>
            </form>
          </article>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.close}
        />
      </div>
    );
  }
}

ModalUpdate.propTypes = {
  book: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default ModalUpdate;

/* 

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  onEdit = () => {
    this.setState({
      editing: true
    });
  };

  onClose = () => {
    this.setState({
      editing: false
    });
  };

<ModalUpdate
          book={bookInfo}
          errors={errors}
          updateBook={this.props.updateBook}
          visible={this.state.editing}
          onClose={this.onClose}
        />
        
*/
