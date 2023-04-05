import { IMovie } from "../../interfaces/MovieInterfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovies } from "./actionCreator";

interface MovieState {
  movies: IMovie[];
  isLoading: boolean;
  isError: string;
}

const initialState: MovieState = {
  movies: [],
  isLoading: false,
  isError: "",
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    deleteArrayMovies(state) {
      state.movies.splice(0);
    },
    clearHomePage() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMovies.fulfilled,
      (state, action: PayloadAction<IMovie[]>) => {
        state.isError = "";
        state.isLoading = false;
        state.movies = [...state.movies, ...(action.payload || [])];
      }
    );
    builder.addCase(fetchMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchMovies.rejected,
      (state, action: PayloadAction<string | any>) => {
        state.isError = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export default movieSlice.reducer;
export const { deleteArrayMovies, clearHomePage } = movieSlice.actions;
