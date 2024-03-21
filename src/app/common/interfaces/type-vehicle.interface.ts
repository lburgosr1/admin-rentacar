import { TypeVehicle } from "../models/type-vehicle.model";

export interface ITypeVehicleResponse {
  total: number;
  typeVehicles: TypeVehicle[];
}
