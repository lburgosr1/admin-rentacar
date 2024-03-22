import { Customer } from "../models/cusotmer.model";
import { IContact, ICustomerContact, IEmail } from "./contact.interface";

export interface IResponseCustomers {
  customers: Customer[];
  ok: boolean;
  total: number;
};
export interface IResponseAllCustomers {
  customers: Customer[];
  ok: boolean;
};

export interface IResponseCustomer {
  customer: Customer;
  ok: boolean;
};

export interface ICustomer {
  firstName: string;
  lastName: string;
  document: string;
  address: any[];
  phone: string;
  email: string;
  customer_id: string;
  typeDocument: string;
  _id: string;
  __v: number;
};
