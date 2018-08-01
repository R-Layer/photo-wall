import { combineReducers } from "redux";

import { authReducer } from "./userReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  authState: authReducer,
  errors
});
