import React, { Component } from "react";
import { connect } from "react-redux";
import { submitCardAction } from "../../redux/actions/cardActions";
class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageName: "",
      imageTagline: "",
      previewURL: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();

    let imageStatus = {
      imageName: this.state.imageName,
      imageTagline: this.state.imageTagline
    };

    let data = new FormData();
    data.append("photo", e.target.inputFile.files[0]);
    data.append("imageStatus", JSON.stringify(imageStatus));
    this.props.submitCard(data, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelect = e => {
    // credits to:  cnlevy [STACK OVERFLOW]
    const prevURL = URL.createObjectURL(e.target.files[0]);
    //Suggest the original image name as actual
    this.setState({
      previewURL: prevURL,
      imageName: e.target.files[0].name
    });
  };

  onLoad = e => {
    // Credits to: Jason J. Nathan [STACK OVERFLOW]
    // Set the MIN dimension to 100 saving the ratio
    const { width, height } = e.target;
    const maxVal = 100;
    let ratio = Math.max(maxVal / width, maxVal / height);
    e.target.width = width * ratio;
    e.target.height = height * ratio;
  };

  render() {
    const { authState, errors } = this.props;
    let spreadErr = {};
    if (errors.isJoi) {
      errors.details.map(err => {
        return spreadErr.hasOwnProperty(err.context.key)
          ? spreadErr[err.context.key].push(err.message.replace(/"/g, ""))
          : (spreadErr[err.context.key] = [err.message.replace(/"/g, "")]);
      });
    }
    return (
      <div className="CST_fullHeight ">
        {/*         {authState.message &&
          !errors.message && (
            <div className="notification is-success has-text-centered CST_frame">
              {authState.message}
            </div>
          )} */}
        {errors.message && (
          <div className="notification is-danger has-text-centered CST_frame">
            {errors.message}
          </div>
        )}
        <div
          className={`columns is-vcentered is-centered ${
            errors.message || authState.message ? "" : "CST_fullHeight"
          }`}
        >
          <div className="column is-8-desktop is-10-tablet">
            <form className="CST_frame" onSubmit={this.onSubmit} noValidate>
              <h1 className="title is-1 has-text-centered CST_titleThrough">
                Post an image
              </h1>
              <img
                id="photo-preview"
                alt="preview"
                src={this.state.previewURL}
                onLoad={this.onLoad}
              />
              <div className="field">
                <label className="label" htmlFor="photo">
                  <span className="button">Load image</span>
                </label>
                <div className="control">
                  <input
                    className={errors.image ? " is-danger" : ""}
                    type="file"
                    name="inputFile"
                    id="photo"
                    onChange={this.onSelect}
                    hidden="hidden"
                  />
                </div>
                {errors.image && (
                  <p className="help is-danger">{errors.image.message}</p>
                )}
              </div>
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
                  Create image card
                </button>
              </div>

              <p className="has-text-centered">
                <a href="/"> Back to the dashboard</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  authState: state.authState
});

const mapDispatchToProps = dispatch => ({
  submitCard: (data, history) => dispatch(submitCardAction(data, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);
