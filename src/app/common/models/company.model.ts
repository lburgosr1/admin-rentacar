import { ICompanyContact } from "../interfaces/contact.interface";

export class Company {

  constructor(
    public companyName: string,
    public rnc: string,
    public phone:   string,
    public email: string,
    public address: string,
    public message: string,
    public company_id?: string,
    public _id?: string
  ) {}
}
