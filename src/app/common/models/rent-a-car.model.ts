import { Coin } from "./coin.model";
import { Customer } from "./cusotmer.model";
import { Document } from "./document.model";
import { Vehicle } from "./vehicle.model";

export class RentACar {

  constructor(
    public customer: Customer,
    public vehicle: Vehicle,
    public document: Document,
    public amount: number,
    public deposit: number,
    public rentalStartDate: Date,
    public rentalEndDate: Date,
    public daysOfRent: number,
    public pricePerDay: number,
    public coin: Coin,
    public notes: string,
    public status: string,
    public _id: string,
    public rentACar_id: string,
    public isCollapsed?: boolean,
  ) { }
}
