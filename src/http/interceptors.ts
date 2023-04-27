import axios from "axios";
import { AuthResponse } from "../interfaces/response/AuthResponse";
import { LOCAL_STORAGE_KEYS } from "../constants/LocalStorageKeys";

export const API_URL = `http://localhost:5000/api`;
// export const API_URL = `https://node-movie-search-web.vercel.app/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    LOCAL_STORAGE_KEYS.ACCESS_TOKEN
  )}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
          response.data.accessToken
        );
        return $api.request(originalRequest);
      } catch (e) {
        alert("Не авторизован");
      }
    }
    throw error;
  }
);

export default $api;
