import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CUSTOMER_URL } from '../constant/api-url.constant';
import { IResponseCustomer, IResponseCustomers } from '../interfaces/customer.interface';
import { Customer } from '../models/cusotmer.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customer!: Customer;

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

  getCustomers(params: string): Observable<IResponseCustomers> {
    const url = `${baseUrl}/${CUSTOMER_URL.getCustomers}?${params}`;
    return this.http.get<IResponseCustomers>(url, this.headers)
      .pipe(
        map(resp => resp)
      );
  }

  getCustomer(customerId: string): Observable<Customer> {
    const url = `${baseUrl}/${CUSTOMER_URL.getCustomer}/${customerId}`;
    return this.http.get<IResponseCustomer>(url, this.headers)
      .pipe(
        map(resp => this.customer = resp.customer)
      );
  }

  createCustomer(data: Customer): Observable<IResponseCustomer> {
    const url = `${baseUrl}/${CUSTOMER_URL.createCustomer}`;
    return this.http.post<IResponseCustomer>(url, data, this.headers)
        .pipe(
          tap(resp => this.customer = resp.customer)
        )
  }

  updateCustomer(data: Customer, customerId: string): Observable<Customer> {
    const url = `${baseUrl}/${CUSTOMER_URL.updateCustomer}/${customerId}`;
    return this.http.put<Customer>(url, data, this.headers);
  }

  updateCustomerContact(data: Customer): Observable<Customer> {
    const url = `${baseUrl}/${CUSTOMER_URL.updateCustomer}/${data.customer_id}`;
    return this.http.put<Customer>(url, data, this.headers);
  }

  deleteCustomer(id: string) {
    const url = `${baseUrl}/${CUSTOMER_URL.deleteCustomer}/${id}`;
    return this.http.delete(url, this.headers);
  }

}
