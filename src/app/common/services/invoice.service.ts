import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INVOICE_URL } from '../constant/api-url.constant';
import { IInvoice, IInvoiceResponse } from '../interfaces/invoice.interface';

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

  getInvoice(id: string): Observable<IInvoice> {
    const url = `${baseUrl}/${INVOICE_URL.getInvoice}/${id}`;
    return this.http.get<IInvoiceResponse>(url, this.headers).pipe(
      map(resp => resp.invoices[0])
    );
  }

  createInvoice(data: any): Observable<Blob> {
    const url = `${baseUrl}/${INVOICE_URL.createInvoice}`;
    return this.http.post<Blob>(url, data, {...this.headers, responseType: 'blob' as 'json'});
  }
}
