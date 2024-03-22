import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EMPLOYEE_URL } from '../constant/api-url.constant';
import { Employee } from '../models/employee.model';
import { IResponseAllEmployees, IResponseEmployee, IResponseEmployees } from '../interfaces/employee.interface';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employee!: Employee;

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

  getEmployees(params: string): Observable<IResponseEmployees> {
    const url = params ? `${baseUrl}/${EMPLOYEE_URL.getEmployees}?${params}` : `${baseUrl}/${EMPLOYEE_URL.getEmployees}`;
    return this.http.get<IResponseEmployees>(url, this.headers)
      .pipe(
        map(resp => resp)
      );
  }

  getAllEmployees(): Observable<IResponseAllEmployees> {
    const url = `${baseUrl}/${EMPLOYEE_URL.getAllEmployees}`;
    return this.http.get<IResponseAllEmployees>(url, this.headers)
      .pipe(
        map(resp => resp)
      );
  }

  getEmployee(employeeId: string): Observable<Employee> {
    const url = `${baseUrl}/${EMPLOYEE_URL.getEmployee}/${employeeId}`;
    return this.http.get<IResponseEmployee>(url, this.headers)
      .pipe(
        map(resp => this.employee = resp.employee)
      );
  }

  createEmployee(data: Employee): Observable<IResponseEmployee> {
    const url = `${baseUrl}/${EMPLOYEE_URL.createEmployee}`;
    return this.http.post<IResponseEmployee>(url, data, this.headers)
        .pipe(
          tap(resp => this.employee = resp.employee)
        )
  }

  updateEmployee(data: Employee, employeeId: string): Observable<Employee> {
    const url = `${baseUrl}/${EMPLOYEE_URL.updateEmployee}/${employeeId}`;
    return this.http.put<Employee>(url, data, this.headers);
  }

  updateEmployeeContact(data: Employee): Observable<Employee> {
    const url = `${baseUrl}/${EMPLOYEE_URL.updateEmployee}/${data.employee_id}`;
    return this.http.put<Employee>(url, data, this.headers);
  }

  deleteEmployee(id: string) {
    const url = `${baseUrl}/${EMPLOYEE_URL.deleteEmployee}/${id}`;
    return this.http.delete(url, this.headers);
  }

}
