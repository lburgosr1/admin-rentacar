import { Component, ElementRef, OnInit } from '@angular/core';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { Customer } from 'src/app/common/models/cusotmer.model';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { CustomersService } from 'src/app/common/services/customer.service';
import { BaseComponent } from '../base.component';
import { FacadeService } from 'src/app/common/services/facade.service';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent extends BaseComponent implements OnInit {

  customers!: Customer[];
  pagination!: IPagination;
  txtTerm: string = '';
  status!: boolean;
  urlParams = {} as IUrlParams;

  constructor(
    private customerService: CustomersService,
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
      this.getCustomers();
    });
  }

  getCustomers(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term,
      status: this.status
    } as any;

    const paramsURL = new URLSearchParams(params);

    this.customerService.getCustomers(`${paramsURL}`).subscribe({
      next: (resp) => {
        this.customers = resp.customers;
        this.pagination.totalRecord = resp.total;
        this.finishLoading();
      }
    });
  }

  editOrNewCustomer(customer?: Customer): void {
    if (customer) {
      this.urlParams = {} as IUrlParams;
      this.urlParams.customerId = customer.customer_id;
      this.urlParams.isEdit = true;
      this.goTo(`${APPROUTES.customerDetails}/${APPROUTES.general}`, this.urlParams);
    } else {
      this.goTo(`${APPROUTES.customerDetails}/${APPROUTES.general}`);
    }
  }

  filterCustomers(): void {
    this.urlParams.term = this.txtTerm;
    this.goTo(APPROUTES.customers, this.urlParams);
  }

  changeStatus(): void {
    this.urlParams.status = this.status;
    this.goTo(APPROUTES.customers, this.urlParams);
  }

  clearSearch(): void {
    if (!this.txtTerm) {
      return;
    }
    this.txtTerm = '';
    this.urlParams = {} as IUrlParams;
    this.goTo(APPROUTES.customers, this.urlParams);
  }

  pageChanged(event: PageChangedEvent): void {
    this.urlParams.page = event.page;
    this.goTo(APPROUTES.customers, this.urlParams);
  }

  changeStatusCustomer(customer: Customer): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si';
    modalModel.title = `${this.status ? 'Eliminar Cliente' : 'Activar Cliente'}`;
    modalModel.body = `¿Desea ${this.status ? 'eliminar' : 'activar'} el cliente ${customer.firstName} ${customer.lastName}?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        const data = { ...customer, status: !customer.status } as Customer;

        this.customerService.updateCustomer(data, data.customer_id).subscribe({
          next: (resp) => {
            this.getCustomers();
            this.facadeService.toast.success('El estato del cliente fue actualizado con exito');
          },
          error: (err) => {
            this.facadeService.toast.error(err.error.msg);
          }
        });
      }
    });
  }
}
