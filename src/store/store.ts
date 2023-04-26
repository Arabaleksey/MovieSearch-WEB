import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./reducers/movieSlice";
import movieInfoSlice from "./reducers/movieInfoSlice";
import movieFavouriteSlice from "./reducers/favouriteSlice";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    movieReducer: movieSlice,
    movieInfoReducer: movieInfoSlice,
    movieFavouriteReducer: movieFavouriteSlice,
    userReducer: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
