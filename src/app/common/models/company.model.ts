import { ICompanyContact } from "../interfaces/contact.interface";

export class Company {

  constructor(
    public name: string,
    public code: string,
    public contacts:   ICompanyContact[],
    public image?: string,
    public company_id?: string,
    public _id?: string
  ) {}
}
