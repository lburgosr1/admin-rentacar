import { User } from "src/app/common/models/user.model";

export class CompanyModel {

  public firstName!: string;
  public lastName!: string;
  public document!: string;
  public user!: User;
  public phone!: string;
  public address!: string;
  public customer_id!: string;
  public typeDocument!: string;
  public employee!: string;
  public email!: string;
  public status!: boolean;

  constructor() {
    this.firstName = '',
    this.lastName = '',
    this.document = '',
    this.user = {} as User,
    this.phone = '',
    this.address = '',
    this.customer_id = '',
    this.typeDocument = '',
    this.employee = '';
    this.email = '';
    this.status = true;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
