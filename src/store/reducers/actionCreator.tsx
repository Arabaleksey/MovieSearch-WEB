import { createAsyncThunk } from "@reduxjs/toolkit";
import MoviesService from "../../services/MoviesService";

export const fetchMovies = createAsyncThunk(
  "movie/fetchSeacrh",
  async ({ searchValue, currentPage }: any, thunkAPI: any) => {
    try {
      const response = await MoviesService.getAllBySearch(
        searchValue,
        currentPage
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Не удалось загрузить фильмы");
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movie/fetchById",
  async ({ movieId }: any, thunkAPI: any) => {
    try {
      const response = await MoviesService.getMovieById(movieId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Не удалось получить информацию о фильме"
      );
    }
  }
);
