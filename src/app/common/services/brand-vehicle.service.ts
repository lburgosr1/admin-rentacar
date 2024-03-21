import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BRAND_URL } from '../constant/api-url.constant';
import { BrandVehicle } from '../models/brand-vehicle.model';
import { IBrandVehicleResponse } from '../interfaces/brand-vehicle.interface';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BrandVehicleService {

  brand!: BrandVehicle;

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

  getBrands(params?: string): Observable<IBrandVehicleResponse> {
    const url = params ? `${baseUrl}/${BRAND_URL.getBrands}?${params}` : `${baseUrl}/${BRAND_URL.getBrands}`;
    return this.http.get<IBrandVehicleResponse>(url, this.headers)
      .pipe(
        map(resp => resp)
      );
  }

  getBrand(brandId: string): Observable<BrandVehicle> {
    const url = `${baseUrl}/${BRAND_URL.getBrand}/${brandId}`;
    return this.http.get<BrandVehicle>(url, this.headers);
  }

  createBrand(data: BrandVehicle): Observable<BrandVehicle> {
    const url = `${baseUrl}/${BRAND_URL.createBrand}`;
    return this.http.post<BrandVehicle>(url, data, this.headers);
  }

  updateBrand(data: BrandVehicle, brandId: string): Observable<BrandVehicle> {
    const url = `${baseUrl}/${BRAND_URL.updateBrand}/${brandId}`;
    return this.http.put<BrandVehicle>(url, data, this.headers);
  }

  updateBrandContact(data: BrandVehicle): Observable<BrandVehicle> {
    const url = `${baseUrl}/${BRAND_URL.updateBrand}/${data._id}`;
    return this.http.put<BrandVehicle>(url, data, this.headers);
  }

  deleteBrand(id: string) {
    const url = `${baseUrl}/${BRAND_URL.deleteBrand}/${id}`;
    return this.http.delete(url, this.headers);
  }

}
