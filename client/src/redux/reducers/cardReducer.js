import { uploadProcess } from "../types";

export const cardReducer = (state = [], action) => {
  switch (action.type) {
    case uploadProcess.REQUEST:
      return state;
    case uploadProcess.SINGLE:
      return [...state, action.card];
    case uploadProcess.ALL:
      return action.cards;
    default:
      return state;
  }
};
