import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleModel } from '../models/vehicle-model.model';
import { IVehicleModelResponse, IVehicleModelsByBrandResponse } from '../interfaces/vehicle-model.interface';
import { VEHICLE_MODEL_URL } from '../constant/api-url.constant';
import { BrandVehicle } from '../models/brand-vehicle.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService {

  model!: VehicleModel;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getVehicleModels(params?: string): Observable<IVehicleModelResponse> {
    const url = params ? `${baseUrl}/${VEHICLE_MODEL_URL.getVehicleModels}?${params}` : `${baseUrl}/${VEHICLE_MODEL_URL.getVehicleModels}`;
    return this.http.get<IVehicleModelResponse>(url, this.headers)
      .pipe(
        map(resp => resp)
      );
  }

  getVehicleModel(modelId: string): Observable<VehicleModel> {
    const url = `${baseUrl}/${VEHICLE_MODEL_URL.getVehicleModel}/${modelId}`;
    return this.http.get<VehicleModel>(url, this.headers);
  }

  getVehicleModelsByBrand(branId: string): Observable<IVehicleModelsByBrandResponse> {
    const url = `${baseUrl}/${VEHICLE_MODEL_URL.getVehicleModelsByBrand}/${branId}`;
    return this.http.get<IVehicleModelsByBrandResponse>(url, this.headers);
  }

  createVehicleModel(data: VehicleModel): Observable<VehicleModel> {
    const url = `${baseUrl}/${VEHICLE_MODEL_URL.createVehicleModel}`;
    return this.http.post<VehicleModel>(url, data, this.headers);
  }

  updateVehicleModel(data: VehicleModel, modelId: string): Observable<VehicleModel> {
    const url = `${baseUrl}/${VEHICLE_MODEL_URL.updateVehicleModel}/${modelId}`;
    return this.http.put<VehicleModel>(url, data, this.headers);
  }

  updateVehicleModelContact(data: VehicleModel): Observable<VehicleModel> {
    const url = `${baseUrl}/${VEHICLE_MODEL_URL.updateVehicleModel}/${data._id}`;
    return this.http.put<VehicleModel>(url, data, this.headers);
  }

  deleteVehicleModel(id: string) {
    const url = `${baseUrl}/${VEHICLE_MODEL_URL.deleteVehicleModel}/${id}`;
    return this.http.delete(url, this.headers);
  }

}
