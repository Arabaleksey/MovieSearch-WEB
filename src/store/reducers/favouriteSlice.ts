import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../interfaces/MovieInterfaces";

interface FavouriteMovieState {
  favouriteMovie: IMovie[];
}

const initialState: FavouriteMovieState = {
  favouriteMovie: [],
};

export const movieFavouriteSlice = createSlice({
  name: "favouriteMovie",
  initialState,
  reducers: {
    deleteAllMovies(state) {
      state.favouriteMovie.length = 0;
    },
    deleteChekedMovie(state, action: PayloadAction<IMovie>) {
      state.favouriteMovie = state.favouriteMovie.filter(
        (el) => el.imdbID !== action.payload.imdbID
      );
    },
    addToFavourites(state, action: PayloadAction<IMovie>): any {
      if (state.favouriteMovie.find((el) => el.imdbID === action.payload.imdbID)) {
        console.log("Duplicate");
      } else {
        state.favouriteMovie = [action.payload, ...state.favouriteMovie];
      }
    },
  },
});

export default movieFavouriteSlice.reducer;
export const { addToFavourites, deleteAllMovies, deleteChekedMovie } =
  movieFavouriteSlice.actions;
