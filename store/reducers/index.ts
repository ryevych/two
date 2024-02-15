import { combineReducers } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteReducer";
import { photosApi } from "./photosApi";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
  favoriteReducer,
  userReducer,
  [photosApi.reducerPath]: photosApi.reducer,
});
