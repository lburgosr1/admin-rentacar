import { Employee } from "../models/employee.model";

export interface IResponseEmployees {
  employees: Employee[];
  ok: boolean;
  total: number;
};
export interface IResponseAllEmployees {
  employees: Employee[];
  ok: boolean;
};

export interface IResponseEmployee {
  employee: Employee;
  ok: boolean;
};

export interface IEmployee {
  firstName: string;
  lastName: string;
  document: string;
  user: string;
  address: any[];
  phone: string;
  email: string;
  employee_id: string;
  typeDocument: string;
  _id: string;
  __v: number;
};
