import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPhotoItem } from "../../components/interfaces";

interface IFavoritesState {
  favorites: IPhotoItem[];
}
const favoritesInitialState: IFavoritesState = { favorites: [] };

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: favoritesInitialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<IPhotoItem>) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      const indexToRemove = state.favorites.findIndex(
        (element) => element.id === action.payload
      );
      if (indexToRemove >= 0) {
        state.favorites.splice(indexToRemove, 1);
      }
    },
  },
});

export default favoriteSlice.reducer;
export const favoritesActions = favoriteSlice.actions;
