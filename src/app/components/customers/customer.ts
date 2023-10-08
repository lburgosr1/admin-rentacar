import { ICustomerContact } from "src/app/common/interfaces/contact.interface";
import { User } from "src/app/common/models/user.model";

export class CustomerModel {

  public firstName!: string;
  public lastName!: string;
  public document!: string;
  public user!: User;
  public contacts!: ICustomerContact[];
  public addresses!: any[];
  public customer_id!: string;
  public typeDocument!: string;

  constructor() {
    this.firstName = '',
    this.lastName = '',
    this.document = '',
    this.user = {} as User,
    this.contacts = [],
    this.addresses = [],
    this.customer_id = '',
    this.typeDocument = 'personalID'
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
