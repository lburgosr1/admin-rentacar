import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { SEARCH_URL } from '../constant/api-url.constant';
import { Customer } from '../models/cusotmer.model';
import { Document } from '../models/document.model';
import { Vehicle } from '../models/vehicle.model';
import { Employee } from '../models/employee.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  public user!: User;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get userId(): string {
    return this.user.user_id || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformUsers(result: any[]): User[] {
    return result.map(
      user => new User(user.firstName, user.lastName, user.userName, '', user.image, user.role, user.google, user.userId)
    );
  }

  search(type: string, term: string): Observable<any[]> {
    const url = `${baseUrl}/${SEARCH_URL.searchForCollection}/${type}/${term}`
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (type) {
            case 'user':
              return this.transformUsers(resp.result);
            case 'customer':
              return resp.result as Customer[];
            case 'employee':
              return resp.result as Employee[];
            case 'document':
              return resp.result as Document[];
            case 'vehicle':
              return resp.result as Vehicle[];
            default:
              return [];
          }
        })
      )
  }
}
