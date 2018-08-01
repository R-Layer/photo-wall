import React, { Component } from "react";
import { connect } from "react-redux";
import { submitImageAction } from "../../redux/actions/userActions";
class TestForm extends Component {
  onSubmit = e => {
    e.preventDefault();
    let data = new FormData();
    data.append("pin", e.target.inputFile.files[0]);
    this.props.submitImage(data);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="file" name="inputFile" />
        <button type="submit">Submit it</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  authState: state.authState
});

const mapDispatchToProps = dispatch => ({
  submitImage: data => dispatch(submitImageAction(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestForm);

/* 
class FileUpload extends Component {
  
  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    axios.post('http://localhost:8000/upload', data)
      .then(function (response) {
    this.setState({ imageURL: `http://localhost:8000/${body.file}`, uploadStatus: true });
      })
      .catch(function (error) {
        console.log(error);
      });
}

   render() {
    return(
      <div class="container">
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <input className="form-control"  ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </div>

          <div className="form-group">
            <input className="form-control" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Optional name for the file" />
          </div>

          <button className="btn btn-success" type>Upload</button>

        </form>
      </div>
    )
  }
}
*/
