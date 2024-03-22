import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/common/services/user.service';
import { BaseComponent } from '../../base.component';
import { FacadeService } from 'src/app/common/services/facade.service';
import { ValidatorService } from 'src/app/common/services/validator.service';
import { UserNameValidatorService } from 'src/app/common/services/user-name-validator.service';
import { Employee } from 'src/app/common/models/employee.model';
import { Observable, tap } from 'rxjs';
import { SearchesService } from 'src/app/common/services/searches.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent {

  registerForm: any;
  formSubmitted = false;
  searchedEmployees: Employee[] = [];
  showSearchesEmployee: boolean = false;
  termEmployee!: string;
  isSearching:boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private userNameValidator: UserNameValidatorService,
    private validatorService: ValidatorService,
    private searchesService: SearchesService,
    facadeService: FacadeService,
    elementRef: ElementRef
  ) {
    super(facadeService, elementRef)
  }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required, [this.userNameValidator]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      role: ['', Validators.required],
      terms: [false, Validators.required],
      employeeId: ['']
    }, {
      validators:  [this.validatorService.similarFormFields('password', 'password2')]
    });
  }

  createUser(): void {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe({
      next: (response) => {
        this.goBack();
      },
      error: (err) => {
        this.toastr.error(err?.error?.msg);
      }
    })
  }

  selectEmployee(employee: Employee): void {
    this.registerForm.controls['firstName']?.setValue(employee.firstName);
    this.registerForm.controls['lastName']?.setValue(employee.lastName);
    this.registerForm.controls['employeeId']?.setValue(employee.employee_id);
    this.termEmployee = `${employee.firstName} ${employee.lastName}`;
    this.showSearchesEmployee = false;
  }

  getEmployees(value: string): Observable<Array<Employee>> {
    return this.searchesService.search('employee', value);
  }

  custormerSerarch(term: string): void {
    if(!term) {
      this.isSearching = true;
      this.showSearchesEmployee = false;
      return;
    }
    const search$ = this.getEmployees(term).pipe(
      tap(() => {
        this.isSearching = false;
        this.showSearchesEmployee = true;
        this.termEmployee = term;
      }));

      search$.subscribe(data => {
        this.searchedEmployees = data ? data : [];
      })
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  invalidPassword(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
