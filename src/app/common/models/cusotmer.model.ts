import { IContact, ICustomerContact, IEmail } from "../interfaces/contact.interface";
import { User } from "./user.model";

export class Customer {

  constructor(
    public firstName: string,
    public lastName: string,
    public document: string,
    public user: User | string,
    public contacts: ICustomerContact[],
    public addresses: any[],
    public customer_id: string,
    public typeDocument: string
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
