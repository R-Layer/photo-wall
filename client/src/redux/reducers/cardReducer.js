import { uploadProcess, destroyCardProcess } from "../types";

export const cardStatusReducer = (state = [], action) => {
  switch (action.type) {
    case uploadProcess.REQUEST:
      return state;
    case uploadProcess.SINGLE:
      return [...state, action.card];
    case uploadProcess.ALL:
      return action.cards;
    case destroyCardProcess.SUCCESS:
      return state.filter(card => card._id !== action.removedCard._id);
    default:
      return state;
  }
};
