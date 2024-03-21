import { environment } from "src/environments/environment";
import { BrandVehicle } from "./brand-vehicle.model";
import { TypeVehicle } from "./type-vehicle.model";
import { VehicleModel } from "./vehicle-model.model";

const base_url = environment.base_url;

export class Vehicle {

  constructor(
    public brand: BrandVehicle,
    public model: VehicleModel,
    public typeVehicle: TypeVehicle,
    public plate: string,
    public year: string,
    public image: string,
    public status: string,
    public vehicle_id: string,
    public _id?: string,
    public imageUpload?: File,
  ) { }

  get imageVehicle(): string {
    if(this.image) {
      return `${base_url}/upload/vehicles/${this.image}`;
    } else {
      return '';
    }
  }

}
