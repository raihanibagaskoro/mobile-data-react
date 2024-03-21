import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {thunk} from "redux-thunk"; // Import thunk directly
import {Reducer} from "./Reducer"; // Assuming Reducer is a default export
import { TransReducer } from "./TransReducer";
import { UserReducer } from "./UserReducer";

const rootReducer = combineReducers({ paket: Reducer, trans: TransReducer, user: UserReducer });

const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
});

export default Store;
