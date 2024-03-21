import { BrandVehicle } from "../models/brand-vehicle.model";
import { TypeVehicle } from "../models/type-vehicle.model";
import { Vehicle } from "../models/vehicle.model";


export interface IVehiclesResponse {
  total: number;
  vehicles: Vehicle[];
}

export interface IVehicleResponse {
  total: number;
  vehicle: Vehicle;
}

export interface IAllVehiclesResponse {
  vehicles: Vehicle[];
}

export interface IVehicle {
  brand: BrandVehicle;
  typeVehicle: TypeVehicle;
  plate: string;
  year: string;
  image: string;
  status: string;
  vehicle_id: string;
}
