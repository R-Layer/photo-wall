import { uploadProcess } from "../types";

export const imageReducer = (state = {}, action) => {
  switch (action.type) {
    case uploadProcess.REQUEST:
      return state;
    case uploadProcess.SUCCESS:
      return Object.assign({}, state, action.uploadedImage);
    default:
      return state;
  }
};
