import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { COMPANY_URL } from '../constant/api-url.constant';
import { Company } from '../models/company.model';
import { IResponseCompany } from '../interfaces/company.interface';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CompanysService {

  company!: Company;

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

  getCompany(companyId: string): Observable<Company> {
    const url = `${baseUrl}/${COMPANY_URL.getCompany}/${companyId}`;
    return this.http.get<IResponseCompany>(url, this.headers)
      .pipe(
        map(resp => this.company = resp.company)
      );
  }

  createCompany(data: Company): Observable<IResponseCompany> {
    const url = `${baseUrl}/${COMPANY_URL.createCompany}`;
    return this.http.post<IResponseCompany>(url, data, this.headers)
        .pipe(
          tap(resp => this.company = resp.company)
        )
  }

  updateCompany(data: Company, companyId: string): Observable<Company> {
    const url = `${baseUrl}/${COMPANY_URL.updateCompany}/${companyId}`;
    return this.http.put<Company>(url, data, this.headers);
  }

}
