import { Component, OnInit } from '@angular/core';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { Customer } from 'src/app/common/models/cusotmer.model';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { CustomersService } from 'src/app/common/services/customer.service';
import { BaseComponent } from '../base.component';
import { FacadeService } from 'src/app/common/services/facade.service';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent extends BaseComponent implements OnInit {

  customers!: Customer[];
  pagination!: IPagination;
  txtTerm: string = '';
  urlParams = {} as IUrlParams;

  constructor(
    private customerService: CustomersService,
    facadeService: FacadeService
  ) {
    super(facadeService);
  }

  ngOnInit(): void {
    this.pagination = new Pagination();
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.urlParams = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
      this.urlParams.term ? this.txtTerm = this.urlParams.term : '';
      this.urlParams?.page ? this.urlParams.page : this.urlParams.page = this.pagination.page;
      this.getCustomers();
    });
  }

  getCustomers(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term
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
    if (!this.txtTerm) {
      this.urlParams = {} as IUrlParams;
      return;
    }
    this.urlParams.term = this.txtTerm;
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
}
