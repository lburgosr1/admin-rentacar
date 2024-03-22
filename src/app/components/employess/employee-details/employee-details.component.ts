import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITab } from 'src/app/common/components/app-tabs/tab';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from 'src/app/components/base.component';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { Employee } from 'src/app/common/models/employee.model';
import { EmployeesService } from 'src/app/common/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent extends BaseComponent<Employee> implements OnInit {

  form!: FormGroup;
  isEdit!: boolean;
  activeTabIndex!: number;
  tabs!: ITab[];
  urlParams = {} as IUrlParams;
  btnHidden!: boolean;

  constructor(
    private employeeService: EmployeesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    facadeService: FacadeService,
    elementRef: ElementRef) {
    super(facadeService, elementRef);
  }

  ngOnInit(): void {
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.urlParams = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
    });

    this.formInit();
    this.suscriptions();

    if (this.urlParams.employeeId) {
      this.getEmployeeDetails(this.urlParams.employeeId);
    }

    if(this.model) {
      if (this.urlParams.employeeId) {
        this.facadeService.utils.isValidForm(this.form.value, this.originalModel, this.form.valid, true);
      } else {
        this.facadeService.utils.isValidForm(this.form.value, this.originalModel, this.form.valid);
      }
    }
  }

  suscriptions(): void {
    this.facadeService.utils.whenCLickSave$.subscribe((value) => {
      if (value) {
        this.editOrNewEmployee();
      }
    });

    this.form.valueChanges.subscribe({
      next: (employee: Employee) => {
        this.model = employee;
      }
    });

    this.form.valueChanges.subscribe(() => {
      if (this.urlParams.employeeId) {
        this.facadeService.utils.isValidForm(this.form.value, this.originalModel, this.form.valid, true);
      } else {
        this.facadeService.utils.isValidForm(this.form.value, this.originalModel, this.form.valid);
      }
    });
  }

  onSave(): void {
    this.editOrNewEmployee();
  }

  getEmployeeDetails(employeeId: string): void {
    this.startLoading();
    this.employeeService.getEmployee(employeeId).subscribe((employee) => {
      this.model = employee;
      this.formEdit();
    });
  }

  formEdit(): void {
    this.form.patchValue({
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      document: this.model.document,
      address: this.model.address,
      phone: this.model.phone,
      email: this.model.email,
      status: this.model.status,
      typeDocument: this.model.typeDocument
    });
    this.originalModel = this.form.value as Employee;
    this.finishLoading();
  }

  formInit(): void {
    this.form = this.fb.group({
      firstName: [this.model.firstName, Validators.required],
      lastName: [this.model.lastName, Validators.required],
      document: [this.model.document, Validators.required],
      address: [this.model.address, Validators.required],
      phone: [this.model.phone, Validators.required],
      email: [this.model.email],
      typeDocument: [this.model.typeDocument]
    });
  }

  editOrNewEmployee(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let data;

    data = {
      firstName: this.facadeService.utils.camelCase(this.form.controls['firstName'].value.trim()),
      lastName: this.facadeService.utils.camelCase(this.form.controls['lastName'].value.trim()),
      document: this.form.controls['document'].value,
      address: this.form.controls['address'].value,
      phone: this.form.controls['phone'].value,
      typeDocument: this.form.controls['typeDocument'].value,
      email: this.form.controls['email'].value
    } as Employee;

    if (this.urlParams.isEdit) {
      this.employeeService.updateEmployee(data, this.urlParams.employeeId).subscribe({
        next: (resp) => {
          this.model = resp;
          this.originalModel = this.form.value as Employee;
          this.toastr.success('El cliente fue actualizado con exito');
          this.goBack();
        },
        error: (err) => {
          this.toastr.error(err.error.msg);
        }
      })

    } else {
      this.employeeService.createEmployee(data).subscribe({
        next: (resp) => {
          this.model = resp.employee;
          this.originalModel = this.form.value as Employee;
          this.toastr.success('EL cliente fue agregado con exito');
          this.goBack();
        },
        error: (err) => {
          this.toastr.error(err.error.msg);
        }
      });
    }
  }
}
