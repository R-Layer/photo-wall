import { combineReducers } from "redux";

import { authReducer } from "./userReducer";
import { imageReducer } from "./imageReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  imageStatus: imageReducer,
  authState: authReducer,
  errors
});
