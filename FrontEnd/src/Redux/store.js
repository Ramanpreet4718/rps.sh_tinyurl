import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import logger from "redux-logger";

export const store = legacy_createStore(
  reducer,
  applyMiddleware(thunk, logger)
);
