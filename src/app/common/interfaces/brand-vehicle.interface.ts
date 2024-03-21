import { BrandVehicle } from "../models/brand-vehicle.model";

export interface IBrandVehicleResponse {
  total: number;
  brandVehicles: BrandVehicle[];
}
