import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PDF_URL } from '../constant/api-url.constant';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GeneratePDFService {

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

  generatePDF(data: any, origenData: string): Observable<Blob> {
    const url = `${baseUrl}/${PDF_URL.generatePDF}/${origenData}`;
    return this.http.post<Blob>(url, data, {...this.headers, responseType: 'blob' as 'json'});
  }
}
