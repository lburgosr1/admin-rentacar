import { RentACar } from "../models/rent-a-car.model";

export interface IInvoiceRequest {
  invoiceCode: string;
  invoiceDate: string;
  firstName: string;
  lastName: string;
  addressCustomer: string;
  emailCustomer: string;
  phoneCustomer: string;
  amount: number;
  daysOfRent: number;
  deposit: number;
  pricePerDay: number;
  rentalEndDate: Date
  rentalStartDate: Date
  brad: string;
  model: string;
  plate: string;
  year: string;
  typeVehicle: string;
  companyName: string;
  message: string;
  rnc: string;
  phone: string;
  email: string;
}

export interface IInvoiceResponse {
  ok: boolean;
  invoices: IInvoice[];
}

export interface IInvoice {
  invoiceCode: string;
  invoiceDate: string;
  rentacar: RentACar;
}
