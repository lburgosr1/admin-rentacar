export class Employee {
  constructor(
    public firstName: string,
    public lastName: string,
    public document: string,
    public user: string,
    public phone: string,
    public address: string,
    public employee_id: string,
    public typeDocument: string,
    public email: string,
    public status: boolean,
    public _id?: string,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
