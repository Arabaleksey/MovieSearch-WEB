import $api from "../http/interceptors";

import { AxiosResponse } from "axios";
import { IUser } from "../interfaces/response/IUser";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }
}
