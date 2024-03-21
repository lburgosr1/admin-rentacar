import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';
import { VEHICLE_URL } from '../constant/api-url.constant';
import { IAllVehiclesResponse, IVehicleResponse, IVehiclesResponse } from '../interfaces/vehicle.interface';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicle!: Vehicle;

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

  getVehicles(params: string): Observable<IVehiclesResponse> {
    const url = params ? `${baseUrl}/${VEHICLE_URL.getVehicles}?${params}` : `${baseUrl}/${VEHICLE_URL.getVehicles}`;
    return this.http.get<IVehiclesResponse>(url, this.headers)
    .pipe(
      map(resp => {
        const vehicles = resp.vehicles.map(vehicle => new Vehicle(
          vehicle.brand, vehicle.model, vehicle.typeVehicle, vehicle.plate, vehicle.year, vehicle.image, vehicle.status, vehicle.vehicle_id))
        return {
          total: resp.total,
          vehicles
        }
      })
    );
  }

  getVehicle(vehicleId: string): Observable<IVehicleResponse> {
    const url = `${baseUrl}/${VEHICLE_URL.getVehicle}/${vehicleId}`;
    return this.http.get<IVehicleResponse>(url, this.headers);
  }

  getAllVehicles(): Observable<IAllVehiclesResponse> {
    const url = `${baseUrl}/${VEHICLE_URL.getAllVehicles}`;
    return this.http.get<IAllVehiclesResponse>(url, this.headers);
  }

  createVehicle(data: Vehicle): Observable<IVehicleResponse> {
    const url = `${baseUrl}/${VEHICLE_URL.createVehicle}`;
    return this.http.post<IVehicleResponse>(url, data, this.headers);
  }

  updateVehicle(data: Vehicle, vehicleId: string): Observable<IVehicleResponse> {
    const url = `${baseUrl}/${VEHICLE_URL.updateVehicle}/${vehicleId}`;
    return this.http.put<IVehicleResponse>(url, data, this.headers);
  }

  updateVehicleContact(data: Vehicle): Observable<IVehicleResponse> {
    const url = `${baseUrl}/${VEHICLE_URL.updateVehicle}/${data.vehicle_id}`;
    return this.http.put<IVehicleResponse>(url, data, this.headers);
  }

  deleteVehicle(id: string) {
    const url = `${baseUrl}/${VEHICLE_URL.deleteVehicle}/${id}`;
    return this.http.delete(url, this.headers);
  }

}
