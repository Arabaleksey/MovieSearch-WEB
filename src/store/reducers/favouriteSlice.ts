import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../interfaces/MovieInterfaces";

interface FavouriteMovieState {
  favouriteMovies: IMovie[];
  currentFavouriteMovies: IMovie[];
}

const initialState: FavouriteMovieState = {
  favouriteMovies: JSON.parse(localStorage.getItem("MOVIE")) || [],
  currentFavouriteMovies: [],
};

export const movieFavouriteSlice = createSlice({
  name: "favouriteMovie",
  initialState,
  reducers: {
    serchMovie(state, action) {
      const regex = new RegExp(action.payload, "gi");
      state.currentFavouriteMovies = state.favouriteMovies.filter((movie) =>
        movie.Title.match(regex)
      );
      localStorage.setItem("MOVIE", JSON.stringify(state.favouriteMovies));
    },
    sortYearAscending(state) {
      state.currentFavouriteMovies = state.currentFavouriteMovies
        .slice(0)
        .sort(
          (a, b) => Number(a.Year.slice(0, 4)) - Number(b.Year.slice(0, 4))
        );
    },
    sortYearDescending(state) {
      state.currentFavouriteMovies = state.currentFavouriteMovies
        .slice(0)
        .sort(
          (a, b) => Number(b.Year.slice(0, 4)) - Number(a.Year.slice(0, 4))
        );
    },
    filterMovie(state, action) {
      if (action.payload === "all") {
        state.currentFavouriteMovies = state.favouriteMovies;
      } else {
        state.currentFavouriteMovies = state.favouriteMovies.filter(
          (movie) => movie.Type === action.payload
        );
      }
    },
    deleteAllMovies(state) {
      state.favouriteMovies.length = 0;
      state.currentFavouriteMovies.length = 0;
      localStorage.setItem("MOVIE", JSON.stringify(state.favouriteMovies));
    },
    deleteChekedMovie(state, action: PayloadAction<IMovie>) {
      state.favouriteMovies = state.favouriteMovies.filter(
        (favouriteMovie) => favouriteMovie.imdbID !== action.payload.imdbID
      );
      state.currentFavouriteMovies = state.favouriteMovies;
      localStorage.setItem("MOVIE", JSON.stringify(state.favouriteMovies));
    },
    addToFavourites(state, action: PayloadAction<IMovie>): any {
      if (
        !state.favouriteMovies.find(
          (favouriteMovie) => favouriteMovie.imdbID === action.payload.imdbID
        )
      ) {
        state.favouriteMovies = [action.payload, ...state.favouriteMovies];
        state.currentFavouriteMovies = state.favouriteMovies;
        localStorage.setItem("MOVIE", JSON.stringify(state.favouriteMovies));
      }
    },
  },
});

export default movieFavouriteSlice.reducer;
export const {
  addToFavourites,
  deleteAllMovies,
  deleteChekedMovie,
  sortYearAscending,
  sortYearDescending,
  filterMovie,
  serchMovie,
} = movieFavouriteSlice.actions;
