import $api from "../http/interceptors";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../interfaces/response/AuthResponse";

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

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
