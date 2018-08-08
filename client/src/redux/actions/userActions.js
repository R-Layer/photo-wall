import {
  deleteProcess,
  failProcess,
  authProcess,
  fetchUsersProcess
} from "../types";

export const registerAction = (userData, history) => dispatch => {
  const requestOptions = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData)
  };

  return fetch("/api/users/signup", requestOptions)
    .then(res => res.json())
    .then(newUser => {
      if (newUser.err) {
        return dispatch({ type: failProcess.ERRORS, err: newUser.err });
      } else {
        dispatch({ type: failProcess.CLEAR });
        history.push("/login");
        return dispatch({ type: authProcess.REGISTER, newUser });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const loginAction = (userData, history) => dispatch => {
  const requestOptions = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData)
  };

  fetch("/api/users/login", requestOptions)
    .then(res => res.json())
    .then(loggedUser => {
      if (loggedUser.err) {
        return dispatch({
          type: failProcess.ERRORS,
          err: loggedUser.err
        });
      } else {
        localStorage.setItem("authToken", "Bearer " + loggedUser.token);
        dispatch({ type: failProcess.CLEAR });
        dispatch({ type: authProcess.LOGIN, loggedUser });
        return history.push("/");
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const logoutAction = () => dispatch => {
  localStorage.removeItem("authToken");
  dispatch({ type: failProcess.CLEAR });
  dispatch({
    type: authProcess.LOGOUT,
    message: "User logged out successfully"
  });
};

export const deleteAction = () => dispatch => {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "application/json" }
  };

  if (localStorage.authToken)
    requestOptions.headers.authorization = localStorage.authToken;

  return fetch("/api/users/delete", requestOptions)
    .then(res => res.json())
    .then(deletedUser => {
      if (deletedUser.err) {
        return dispatch({
          type: failProcess.ERRORS,
          err: { message: deletedUser.message }
        });
      } else {
        dispatch({ type: failProcess.CLEAR });
        return dispatch({ type: deleteProcess.SUCCESS, deletedUser });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const updateAction = userData => dispatch => {
  const requestOptions = {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData)
  };

  if (localStorage.authToken) {
    requestOptions.headers.authorization = localStorage.authToken;
  }

  return fetch("/api/users/update", requestOptions)
    .then(res => res.json())
    .then(updatedUser => {
      if (updatedUser.err) {
        return dispatch({ type: failProcess.ERRORS, err: updatedUser.err });
      } else {
        localStorage.setItem("authToken", "Bearer " + updatedUser.token);
        dispatch({ type: failProcess.CLEAR });
        return dispatch({
          type: authProcess.LOGIN,
          loggedUser: updatedUser
        });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const getUserAction = name => dispatch => {
  const requestOptions = {
    method: "GET",
    headers: { "content-type": "application/json" }
  };

  if (localStorage.authToken) {
    requestOptions.headers.authorization = localStorage.authToken;
  }

  return fetch(`/api/users/${name}`, requestOptions)
    .then(res => res.json())
    .then(user => {
      if (user.err) {
        return dispatch({ type: failProcess.ERRORS, err: user.err });
      } else {
        return user.user;
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const getUsersAction = () => dispatch => {
  return fetch("/api/users")
    .then(res => res.json())
    .then(users => {
      if (users.err) {
        return dispatch({ type: failProcess.ERRORS, err: users.err });
      } else {
        return dispatch({
          type: fetchUsersProcess.SUCCESS,
          users: users.users
        });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};
