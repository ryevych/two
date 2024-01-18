import { combineReducers } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteReducer";
import { photosApi } from "./photosApi";

export const rootReducer = combineReducers({
  favoriteReducer,
  [photosApi.reducerPath]: photosApi.reducer,
});
