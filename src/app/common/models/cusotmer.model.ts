import { User } from "./user.model";

export class Customer {

  constructor(
    public firstName: string,
    public lastName: string,
    public document: string,
    public user: User | string,
    public phone: string,
    public address: string,
    public customer_id: string,
    public typeDocument: string,
    public email: string,
    public status: boolean,
    public employee: string,
    public _id?: string,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
