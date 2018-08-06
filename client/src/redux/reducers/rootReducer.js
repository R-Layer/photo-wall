import { combineReducers } from "redux";

import { authReducer, listReducer } from "./userReducer";
import { cardStatusReducer } from "./cardReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  cardStatus: cardStatusReducer,
  authState: authReducer,
  users: listReducer,
  errors
});
