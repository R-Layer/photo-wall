import {
  uploadProcess,
  destroyCardProcess,
  updateCardProcess,
  failProcess
} from "../types";

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
        history.push("/");
        dispatch({ type: failProcess.CLEAR });
        return dispatch({
          type: uploadProcess.SINGLE,
          card: uploadedCard.newCard
        });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
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
        return dispatch({
          type: uploadProcess.ALL,
          cards: uploadedCard.cards
        });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const removeCardAction = id => dispatch => {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "application/json" }
  };

  if (localStorage.authToken)
    requestOptions.headers.authorization = localStorage.authToken;

  return fetch(`api/card/remove/${id}`, requestOptions)
    .then(res => res.json())
    .then(removedCard => {
      if (removedCard.err) {
        return dispatch({ type: failProcess.ERRORS, err: removedCard.err });
      } else {
        return dispatch({
          type: destroyCardProcess.SUCCESS,
          removedCard: removedCard.result
        });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const updateCardAction = (id, data) => dispatch => {
  const requestOptions = {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  };

  if (localStorage.authToken) {
    requestOptions.headers.authorization = localStorage.authToken;
  }

  return fetch(`api/card/updateCard/${id}`, requestOptions)
    .then(res => res.json())
    .then(updatedCard => {
      if (updatedCard.err) {
        return dispatch({ type: failProcess.ERRORS, err: updatedCard.err });
      } else {
        dispatch({ type: failProcess.CLEAR });
        return dispatch({
          type: updateCardProcess.SUCCESS,
          updatedCard: updatedCard.updatedCard
        });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};
