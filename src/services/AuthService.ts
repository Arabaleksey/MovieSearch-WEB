import $api from "../http/interceptors";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../interfaces/response/AuthResponse";
import { LOCAL_STORAGE_KEYS } from "../constants/LocalStorageKeys";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", {
      name,
      surname,
      email,
      password,
    });
  }

  // static async checkAuth(
  //   refreshToken: string
  // ): Promise<any> {
  //   return $api.post<AuthResponse>("/refresh", {
  //     data:refreshToken,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem(
  //         LOCAL_STORAGE_KEYS.ACCESS_TOKEN
  //       )}`,
  //     },
  //     withCredentials: true,
  //   });
    
  // }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}


