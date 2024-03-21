import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { VALIDATOR_URL } from '../constant/api-url.constant';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserNameValidatorService implements AsyncValidator {

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

  validate(control: AbstractControl): Observable<ValidationErrors> {

    const userName = control.value;

    return this.http.get<any>(`${baseUrl}/${VALIDATOR_URL.userNameValidator}?userName=${userName}`)
      .pipe(
        map(resp => {
          delay(3000)
          return (!resp.ok)
            ? null
            : { userNameTaken: true }
        })
      ) as any;
  }
}
