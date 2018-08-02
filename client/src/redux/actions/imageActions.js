import { uploadProcess, failProcess } from "../types";

export const submitImageAction = data => dispatch => {
  const requestOptions = {
    method: "POST",
    headers: {}, //{ "content-type": "multipart/form-data" },
    body: data
  };

  if (localStorage.authToken) {
    requestOptions.headers.authorization = localStorage.authToken;
  }

  return fetch("api/image/upload", requestOptions)
    .then(res => res.json())
    .then(uploadedImage => {
      if (uploadedImage.err) {
        return dispatch({ type: failProcess.ERRORS, err: uploadedImage.err });
      } else {
        console.log("uploaded image", uploadedImage);
        return dispatch({ type: uploadProcess.SUCCESS, uploadedImage });
      }
    })
    .catch(err => {
      console.log("err", err);
      return dispatch({ type: failProcess.ERRORS, err });
    });
};
