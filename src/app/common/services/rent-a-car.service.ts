import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RENT_A_CAR_URL } from '../constant/api-url.constant';
import { IRentACarResponse } from '../interfaces/rent-a-car.interface';
import { RentACar } from '../models/rent-a-car.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RentACarService {

  model!: RentACar;

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

  getRentACars(params?: string): Observable<IRentACarResponse> {
    const url = params ? `${baseUrl}/${RENT_A_CAR_URL.getRentACars}?${params}` : `${baseUrl}/${RENT_A_CAR_URL.getRentACars}`;
    return this.http.get<IRentACarResponse>(url, this.headers)
      .pipe(
        map(resp => {
          const rentedCars = resp.rentedCars.map(rented => new RentACar(
            rented.customer, rented.vehicle, rented.document, rented.amount, rented.deposit, rented.rentalStartDate,
            rented.rentalEndDate, rented.daysOfRent, rented.pricePerDay, rented.coin, rented.notes, rented.status,
            '', rented.rentACar_id, false));
          return {
            total: resp.total,
            rentedCars
          }
        })
      );
  }

  getRentACar(modelId: string): Observable<RentACar> {
    const url = `${baseUrl}/${RENT_A_CAR_URL.getRentACar}/${modelId}`;
    return this.http.get<RentACar>(url, this.headers);
  }

  createRentACar(data: RentACar): Observable<RentACar> {
    const url = `${baseUrl}/${RENT_A_CAR_URL.createRentACar}`;
    return this.http.post<RentACar>(url, data, this.headers);
  }

  updateRentACar(data: RentACar, id: string): Observable<RentACar> {
    const url = `${baseUrl}/${RENT_A_CAR_URL.updateRentACar}/${id}`;
    return this.http.put<RentACar>(url, data, this.headers);
  }

  deleteRentACar(id: string) {
    const url = `${baseUrl}/${RENT_A_CAR_URL.deleteRentACar}/${id}`;
    return this.http.delete(url, this.headers);
  }

}
