import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INVOICE_URL } from '../constant/api-url.constant';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoice!: any;

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

  getInvoice(id: string): Observable<any> {
    const url = `${baseUrl}/${INVOICE_URL.getInvoice}/${id}`;
    return this.http.get<any>(url, this.headers);
  }

  createInvoice(data: any): Observable<Blob> {
    const url = `${baseUrl}/${INVOICE_URL.createInvoice}`;
    return this.http.post<Blob>(url, data, {...this.headers, responseType: 'blob' as 'json'});
  }
}
