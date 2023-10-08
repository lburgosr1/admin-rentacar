import { User } from "../models/user.model";

export interface IUsersResponse {
  total: number;
  users: User[];
}
