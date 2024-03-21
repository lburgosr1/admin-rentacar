import { VehicleModel } from "../models/vehicle-model.model";


export interface IVehicleModelResponse {
  total: number;
  vehicleModels: VehicleModel[];
}

export interface IVehicleModelsByBrandResponse {
  ok: boolean;
  models: VehicleModel[];
}
