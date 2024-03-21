import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TYPE_VEHICLE_URL } from '../constant/api-url.constant';
import { TypeVehicle } from '../models/type-vehicle.model';
import { ITypeVehicleResponse } from '../interfaces/type-vehicle.interface';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TypeVehicleService {

  TypeVehicle!: TypeVehicle;

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

  getTypeVehicles(params?: string): Observable<ITypeVehicleResponse> {
    const url = params ? `${baseUrl}/${TYPE_VEHICLE_URL.getTypeVehicles}?${params}` : `${baseUrl}/${TYPE_VEHICLE_URL.getTypeVehicles}`;
    return this.http.get<ITypeVehicleResponse>(url, this.headers)
      .pipe(
        map(resp => resp)
      );
  }

  getTypeVehicle(typeVehicleId: string): Observable<TypeVehicle> {
    const url = `${baseUrl}/${TYPE_VEHICLE_URL.getTypeVehicle}/${typeVehicleId}`;
    return this.http.get<TypeVehicle>(url, this.headers);
  }

  createTypeVehicle(data: TypeVehicle): Observable<TypeVehicle> {
    const url = `${baseUrl}/${TYPE_VEHICLE_URL.createTypeVehicle}`;
    return this.http.post<TypeVehicle>(url, data, this.headers);
  }

  updateTypeVehicle(data: TypeVehicle, typeVehicleId: string): Observable<TypeVehicle> {
    const url = `${baseUrl}/${TYPE_VEHICLE_URL.updateTypeVehicle}/${typeVehicleId}`;
    return this.http.put<TypeVehicle>(url, data, this.headers);
  }

  updateTypeVehicleContact(data: TypeVehicle): Observable<TypeVehicle> {
    const url = `${baseUrl}/${TYPE_VEHICLE_URL.updateTypeVehicle}/${data._id}`;
    return this.http.put<TypeVehicle>(url, data, this.headers);
  }

  deleteTypeVehicle(id: string) {
    const url = `${baseUrl}/${TYPE_VEHICLE_URL.deleteTypeVehicle}/${id}`;
    return this.http.delete(url, this.headers);
  }

}
