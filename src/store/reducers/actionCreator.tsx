import { createAsyncThunk } from "@reduxjs/toolkit";
import MoviesService from "../../services/MoviesService";
import AuthService from "../../services/AuthService";
import { AuthResponse } from "../../interfaces/response/AuthResponse";
import { API_URL } from "../../http/interceptors";
import axios from "axios";
import { LOCAL_STORAGE_KEYS } from "../../constants/LocalStorageKeys";

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

export const login = createAsyncThunk(
  "login",
  async ({ email, password }: any, thunkAPI: any) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
        response.data.accessToken
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
        response.data.refreshToken
      );
      return response.data.user;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message);
    }
  }
);

export const registration = createAsyncThunk(
  "registration",
  async ({ name, surname, email, password }: any, thunkAPI: any) => {
    try {
      const response = await AuthService.registration(
        name,
        surname,
        email,
        password
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
        response.data.accessToken
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
        response.data.refreshToken
      );
      return response.data.user;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message);
    }
  }
);

export const logout = createAsyncThunk("logout", async () => {
  try {
    const response = await AuthService.logout();
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.MOVIES);
    location.reload();
  } catch (e: any) {
    alert(e.response?.data?.message);
  }
});

export const checkAuth = createAsyncThunk(
  "checkAuth",
  async ({refreshToken}: any) => {
    // try {
      console.log(refreshToken)
    const response = await axios.post<AuthResponse>(`${API_URL}/refresh`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN
        )}`,
      },
      refreshToken:refreshToken,
      withCredentials: true,
    });
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
      response.data.accessToken
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
      response.data.refreshToken
    );
    return response.data.user;
    // } catch (e: any) {
    //   alert(e.response?.data?.message);
    // }
  }
);


// export const checkAuth = createAsyncThunk(
//   "checkAuth",
//   async ({refreshToken}: any, thunkAPI: any) => {
//     console.log(refreshToken)
//     try {
//       const response = await AuthService.checkAuth(refreshToken);
//       localStorage.setItem(
//         LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
//         response.data.accessToken
//       );
//       localStorage.setItem(
//         LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
//         response.data.refreshToken
//       );
//       return response.data.user;
//     } catch (e: any) {
//       return thunkAPI.rejectWithValue(e.response?.data?.message);
//     }
//   }
// );
