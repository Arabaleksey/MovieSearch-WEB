import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../interfaces/MovieInterfaces";

interface FavouriteMovieState {
  favouriteMovies: IMovie[];
}

const initialState: FavouriteMovieState = {
  favouriteMovies: [],
};

export const movieFavouriteSlice = createSlice({
  name: "favouriteMovie",
  initialState,
  reducers: {
    deleteAllMovies(state) {
      state.favouriteMovies.length = 0;
    },
    deleteChekedMovie(state, action: PayloadAction<IMovie>) {
      state.favouriteMovies = state.favouriteMovies.filter(
        (favouriteMovie) => favouriteMovie.imdbID !== action.payload.imdbID
      );
    },
    addToFavourites(state, action: PayloadAction<IMovie>): any {
      if (!state.favouriteMovies.find((favouriteMovie) => favouriteMovie.imdbID === action.payload.imdbID)
      ) {
        state.favouriteMovies = [action.payload, ...state.favouriteMovies];
      }
    },
  },
});

export default movieFavouriteSlice.reducer;
export const { addToFavourites, deleteAllMovies, deleteChekedMovie } =
  movieFavouriteSlice.actions;
