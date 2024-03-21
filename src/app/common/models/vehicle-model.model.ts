import { BrandVehicle } from "./brand-vehicle.model";

export class VehicleModel {

  constructor(
    public vehicleModel: string,
    public brand: BrandVehicle,
    public status: boolean,
    public _id: string,
    public vehicle_model_id: string,
  ) {}
}
