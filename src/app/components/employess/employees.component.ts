import { Component, ElementRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from '../base.component';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';
import { Employee } from 'src/app/common/models/employee.model';
import { EmployeesService } from 'src/app/common/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent extends BaseComponent implements OnInit {
  employees!: Employee[];
  pagination!: IPagination;
  txtTerm: string = '';
  status!: boolean;
  urlParams = {} as IUrlParams;

  constructor(
    private employeeService: EmployeesService,
    private modal: BsModalService,
    facadeService: FacadeService,
    elementRef: ElementRef
  ) {
    super(facadeService, elementRef);
  }

  ngOnInit(): void {
    this.pagination = new Pagination();
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.urlParams = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
      this.urlParams.term ? this.txtTerm = this.urlParams.term : '';
      this.urlParams?.status ? this.status = this.urlParams.status :
      this.urlParams?.status === undefined ? this.status = true :
      this.status = false;
      this.urlParams?.page ? this.urlParams.page : this.urlParams.page = this.pagination.page;
      this.getEmployees();
    });
  }

  getEmployees(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term,
      status: this.status
    } as any;

    const paramsURL = new URLSearchParams(params);

    this.employeeService.getEmployees(`${paramsURL}`).subscribe({
      next: (resp) => {
        this.employees = resp.employees;
        this.pagination.totalRecord = resp.total;
        this.finishLoading();
      }
    });
  }

  editOrNewEmployee(employee?: Employee): void {
    if (employee) {
      this.urlParams = {} as IUrlParams;
      this.urlParams.employeeId = employee.employee_id;
      this.urlParams.isEdit = true;
      this.goTo(`${APPROUTES.employeeDetails}/${APPROUTES.general}`, this.urlParams);
    } else {
      this.goTo(`${APPROUTES.employeeDetails}/${APPROUTES.general}`);
    }
  }

  filterEmployees(): void {
    this.urlParams.term = this.txtTerm;
    this.goTo(APPROUTES.employees, this.urlParams);
  }

  changeStatus(): void {
    this.urlParams.status = this.status;
    this.goTo(APPROUTES.employees, this.urlParams);
  }

  clearSearch(): void {
    if (!this.txtTerm) {
      return;
    }
    this.txtTerm = '';
    this.urlParams = {} as IUrlParams;
    this.goTo(APPROUTES.employees, this.urlParams);
  }

  pageChanged(event: PageChangedEvent): void {
    this.urlParams.page = event.page;
    this.goTo(APPROUTES.employees, this.urlParams);
  }

  changeStatusEmployee(employee: Employee): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si';
    modalModel.title = `${this.status ? 'Eliminar Empleado' : 'Activar Empleado'}`;
    modalModel.body = `¿Desea ${this.status ? 'eliminar' : 'activar'} el empleado ${employee.firstName} ${employee.lastName}?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        const data = { ...employee, status: !employee.status } as Employee;

        this.employeeService.updateEmployee(data, data.employee_id).subscribe({
          next: (resp) => {
            this.getEmployees();
            this.facadeService.toast.success('El estato del empleado fue actualizado con exito');
          },
          error: (err) => {
            this.facadeService.toast.error(err.error.msg);
          }
        });
      }
    });
  }
}
