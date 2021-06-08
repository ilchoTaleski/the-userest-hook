import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducers as songsReducers } from "slices/songs";
import { reducers as productsReducers } from "slices/playlists";

export const store = configureStore({
  reducer: {
    songs: songsReducers,
    products: productsReducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
