import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginForm } from '../interfaces/login-form.interface';
import { IRegisterForm } from '../interfaces/register-form.interface';
import { catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { IUsersResponse } from '../interfaces/user.interface';
import { LOGIN_URL, USERS_URL } from '../constant/api-url.constant';
import { APPROUTES } from '../constant/app-routes.constant';
import { TypeRoleUserEnum } from '../constant/enums.constant';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  private hiddenForRole = new BehaviorSubject(false);
  public hiddenForRole$ = this.hiddenForRole.asObservable()

  constructor(private http: HttpClient,
    private ngZone: NgZone,
    private router: Router) { }

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

  get role(): string {
    return this.user.role || '';
  }

  setLocalStorage(token: string, menu: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('customers');
    localStorage.removeItem('vehicles');

    this.ngZone.run(() => {
      this.router.navigateByUrl(APPROUTES.authentication);
    });
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${baseUrl}/${LOGIN_URL.loginRenew}`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap((resp: any) => {
        const { firstName, lastName, userName, image, status, role, user_id } = resp.user;
        this.user = new User(firstName, lastName, userName, '', role, status, image, user_id);
        if(this.user.role === TypeRoleUserEnum.Admin) {
          this.hiddenForRole.next(false);
        } else {
          this.hiddenForRole.next(true);
        }
        this.setLocalStorage(resp.token, resp.menu);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  handleCredentialResponse(response: any): void {
  }

  uptadeProfile(data: { userName: string, name: string, role: string }) {

    data = {
      ...data,
      role: this.user.role || ''
    };

    return this.http.put(`${baseUrl}/${USERS_URL.getUsers}/${this.userId}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  createUser(formData: IRegisterForm): Observable<any> {
    return this.http.post(`${baseUrl}/${USERS_URL.createUser}`, formData)
      .pipe(
        tap((resp: any) => {
          this.setLocalStorage(resp.token, resp.menu);
        })
      )
  }

  login(formData: ILoginForm): Observable<any> {
    const { userName, password } = formData;

    return this.http.post(`${baseUrl}/login`, { userName, password })
      .pipe(
        tap((resp: any) => {
          this.setLocalStorage(resp.token, resp.menu);
        })
      )
  }

  getUsers(params?: string): Observable<IUsersResponse> {

    const url = `${baseUrl}/${USERS_URL.getUsers}?${params}`
    return this.http.get<IUsersResponse>(url, this.headers)
      .pipe(
        map(resp => {
          const users = resp.users.map(user => new User(
            user.firstName, user.lastName, user.userName, '', user.role, user.status, user.image, user.user_id))
          return {
            total: resp.total,
            users
          }
        })
      );
  }

  updateUser(user: User) {
    const url = `${baseUrl}/${USERS_URL.updateUser}/${user.user_id}`;
    return this.http.put(url, user, this.headers);
  }

  deleteUser(user: User) {
    const url = `${baseUrl}/${USERS_URL.deleteUser}/${user.user_id}`;
    return this.http.delete(url, this.headers);
  }

  changeRole(user: User) {
    const url = `${baseUrl}/${USERS_URL.saveUser}/${user.user_id}`;
    return this.http.put(url, user, this.headers);
  }
}
