import { combineReducers } from "redux";

import { authReducer } from "./userReducer";
import { cardReducer } from "./cardReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  cardStatus: cardReducer,
  authState: authReducer,
  errors
});
