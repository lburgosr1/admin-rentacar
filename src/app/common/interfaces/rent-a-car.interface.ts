import { RentACar } from "../models/rent-a-car.model";


export interface IRentACarResponse {
  total: number;
  rentedCars: RentACar[];
}
