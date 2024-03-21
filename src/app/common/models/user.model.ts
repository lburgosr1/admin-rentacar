import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class User {

  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string,
    public password: string,
    public role?: string,
    public status?: boolean,
    public image?: string,
    public user_id?: string,
    public _id?: string,
  ) {}

  get imageUser(): string {

    if(this.image) {
      return `${base_url}/upload/users/${this.image}`;
    } else {
      return `${base_url}/upload/users/no-image`;
    }
  }

  get fullNameUser(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  setUserProfile(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userName = user.userName;
  }
}
