import jwt_decode from "jwt-decode";

import { authProcess } from "../types";

export const authReducer = (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case authProcess.REGISTER:
      return { isAuthenticated: false, message: action.newUser.message };
    case authProcess.LOGIN:
      let user = jwt_decode(action.loggedUser.token);
      return {
        isAuthenticated: true,
        message: action.loggedUser.message,
        user
      };
    case authProcess.LOGOUT:
      return { isAuthenticated: false, message: action.message };
    default:
      return state;
  }
};
