import { IMovieInfo } from "../../interfaces/MovieInterfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieById } from "./actionCreator";

interface MovieInfoState {
  movie: IMovieInfo[];
  isLoading: boolean;
  isError: string;
}

const initialState: MovieInfoState = {
  movie: [],
  isLoading: false,
  isError: "",
};

export const movieInfoSlice = createSlice({
  name: "movieInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchMovieById.fulfilled,
      (state, action: PayloadAction<IMovieInfo[]>) => {
        state.isError = "";
        state.isLoading = false;
        state.movie = action.payload || [];
      }
    );
    builder.addCase(fetchMovieById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchMovieById.rejected,
      (state, action: PayloadAction<string | any>) => {
        state.isError = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export default movieInfoSlice.reducer;
