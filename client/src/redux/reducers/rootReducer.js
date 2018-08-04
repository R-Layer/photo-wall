import { combineReducers } from "redux";

import { authReducer } from "./userReducer";
import { cardStatusReducer } from "./cardReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  cardStatus: cardStatusReducer,
  authState: authReducer,
  errors
});
