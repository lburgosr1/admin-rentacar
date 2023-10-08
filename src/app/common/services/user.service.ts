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
import { TypeRoleUser } from '../constant/enums.constant';

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
        const { firstName, lastName, email, image, role, google, user_id } = resp.user;
        this.user = new User(firstName, lastName, email, '', image, role, google, user_id);
        if(this.user.role === TypeRoleUser.Admin) {
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

  uptadeProfile(data: { email: string, name: string, role: string }) {

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
    return this.http.post(`${baseUrl}/login`, formData)
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
            user.firstName, user.lastName, user.email, '', user.image, user.role, user.google, user.user_id))
          return {
            total: resp.total,
            users
          }
        })
      );
  }

  updateUser(user: User) {
    const url = `${baseUrl}/${USERS_URL.updateUser}/${user.user_id}`;
    return this.http.put(url, this.headers);
  }

  deleteUser(user: User) {
    const url = `${baseUrl}/${USERS_URL.deleteUser}/${user.user_id}`;
    return this.http.delete(url, this.headers);
  }

  saveUser(user: User) {
    return this.http.put(`${baseUrl}/${USERS_URL.saveUser}/${user.user_id}`, user, this.headers);
  }

  getAgents(): Observable<IUsersResponse> {

    const url = `${baseUrl}/${USERS_URL.getUsers}`
    return this.http.get<IUsersResponse>(url, this.headers)
      .pipe(
        map(resp => {
          const agents = resp.users.map(user => new User(
            user.firstName, user.lastName, user.email, '', user.image, user.role, user.google, user.user_id));
          const users = agents.filter(agent => agent.role === TypeRoleUser.Agent);
          return {
            total: resp.total,
            users
          }
        })
      );
  }
}
