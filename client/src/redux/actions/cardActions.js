import { uploadProcess, failProcess } from "../types";

export const submitCardAction = (data, history) => dispatch => {
  const requestOptions = {
    method: "POST",
    headers: {}, //{ "content-type": "multipart/form-data" },
    body: data
  };

  if (localStorage.authToken) {
    requestOptions.headers.authorization = localStorage.authToken;
  }

  return fetch("api/card/upload", requestOptions)
    .then(res => res.json())
    .then(uploadedCard => {
      if (uploadedCard.err) {
        return dispatch({ type: failProcess.ERRORS, err: uploadedCard.err });
      } else {
        console.log("uploaded card", uploadedCard);
        history.push("/");
        return dispatch({
          type: uploadProcess.SINGLE,
          uploadedCard
        });
      }
    })
    .catch(err => {
      console.log("err", err);
      return dispatch({ type: failProcess.ERRORS, err });
    });
};

export const getCardsAction = () => dispatch => {
  const requestOptions = {
    method: "GET",
    headers: {}
  };

  return fetch("api/card", requestOptions)
    .then(res => res.json())
    .then(uploadedCard => {
      if (uploadedCard.err) {
        return dispatch({ type: failProcess.ERRORS, err: uploadedCard.err });
      } else {
        console.log("uploaded card", uploadedCard.cards);
        return dispatch({
          type: uploadProcess.ALL,
          cards: uploadedCard.cards
        });
      }
    })
    .catch(err => {
      console.log("err", err);
      return dispatch({ type: failProcess.ERRORS, err });
    });
};
