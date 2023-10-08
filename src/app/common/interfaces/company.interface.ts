import { Company } from "../models/company.model";

export interface IResponseCompanies {
  ok:      boolean;
  companies: Company[];
  total: number;
}

export interface IResponseCompany {
  ok:      boolean;
  company: Company;
}
