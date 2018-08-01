import { failProcess } from "../types";

export const errors = (state = {}, action) => {
  switch (action.type) {
    case failProcess.ERRORS:
      return action.err;
    case failProcess.CLEAR:
      return {};
    default:
      return state;
  }
};
