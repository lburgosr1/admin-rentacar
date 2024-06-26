import { Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../base.component';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { RentACar } from 'src/app/common/models/rent-a-car.model';
import { RentACarService } from 'src/app/common/services/rent-a-car.service';
import { AppModalRentACarDetailsComponent } from 'src/app/common/components/app-modals/app-modal-rent-a-car-details/app-modal-rent-a-car-details.component';
import { AppModalPaymentComponent } from 'src/app/common/components/app-modals/app-modal-payment/app-modal-payment.component';
import { StatusRentACarEnum } from 'src/app/common/constant/enums.constant';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { InvoiceService } from 'src/app/common/services/invoice.service';
import { CompanysService } from 'src/app/common/services/company.service';
import { IInvoice, IInvoiceRequest } from 'src/app/common/interfaces/invoice.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url_web;

@Component({
  selector: 'app-rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent extends BaseComponent implements OnInit {
  @ViewChild('tpl') template!: TemplateRef<any>;
  @ViewChildren('cdkrow', { read: ViewContainerRef }) rowContainers!: QueryList<ViewContainerRef>;
  rentedCars!: RentACar[];
  pagination!: IPagination;
  txtTerm: string = '';
  status!: boolean;
  urlParams = {} as IUrlParams;

  constructor(
    private rentACarService: RentACarService,
    private modal: BsModalService,
    private invoiceService: InvoiceService,
    private companyService: CompanysService,
    facadeService: FacadeService,
    elementRef: ElementRef) {
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
      this.getRentACars();
    });
    this.getCompanyDetails();
  }

  toggleRowDetail(index:number, row: any){
    let vcRef: ViewContainerRef = this.rowContainers['_results'][index]; //get row view container
    this.rentedCars[index].isCollapsed = !this.rentedCars[index].isCollapsed

    if (!this.rentedCars[index].isCollapsed) { vcRef.remove();}//clear existing content
    else {
      vcRef.clear;
      if (this.template && row) {
        vcRef.createEmbeddedView(this.template, { $implicit:row });
      }
    }
  }

  getRentACars(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term,
      status: this.status
    } as any;

    const paramsURL = new URLSearchParams(params);

    this.rentACarService.getRentACars(`${paramsURL}`).subscribe({
      next: (resp) => {
        this.rentedCars = resp.rentedCars;
        this.pagination.totalRecord = resp.total;
        this.finishLoading();
      },
      error: () => {
        this.finishLoading();
      }
    });
  }

  getCompanyDetails(): void {
    this.companyService.getCompany(environment.company_id).subscribe((company) => {
      this.companyService.company = company;
    });
  }

  pageChanged(event: any) {
    this.urlParams.page = event.page;
    this.getRentACars();
  }

  search(): void {
    this.urlParams.term = this.txtTerm;
    this.goTo(APPROUTES.rentACar, this.urlParams);
  }

  getInvoice(id: string): void {
    this.startLoading();
    this.invoiceService.getInvoice(id).subscribe({
      next: (invoiceResponse: IInvoice) => {
        const invoice = invoiceResponse;
        const invoiceRequest = this.requestInvoice(invoice);
        this.generatePDF(invoiceRequest);
      }
    });
  }

  generatePDF(invoiceRequest: IInvoiceRequest): void {
    const url = this.facadeService.router.serializeUrl(
        this.facadeService.router.createUrlTree([`/${APPROUTES.invoice}`], { queryParams: invoiceRequest }));
    const data = {
      url: `${baseUrl}${url}`
    };
    this.invoiceService.createInvoice(data).subscribe({
      next: (resp) => {
        console.log(resp);
        const file = new Blob([resp], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        this.finishLoading();
      }
    })
  }

  createRentACar(): void {
    let initialState;

    const rentACar = {} as RentACar;
    initialState = {
      rentACar: rentACar
    };

    const modalRef = this.modal.show(AppModalRentACarDetailsComponent, { class: 'modal-lg modal-dialog-centered', initialState });
    modalRef?.content?.whenClose.subscribe((rentACar: RentACar) => {
      if (rentACar) {
        this.rentACarService.createRentACar(rentACar).subscribe({
          next: (resp) => {
            this.facadeService.toast.success('Alquiler registrado con exito');
            this.getRentACars();
          },
          error: (err) => {
            this.facadeService.toast.error(err.error.msg);
          }
        });
      }
    });
  }

  payment(rentACar: RentACar): void {
    const initialState = {
      rentACar: rentACar
    };

    const modalRef = this.modal.show(AppModalPaymentComponent, { class: 'modal-dialog-centered', initialState});
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        const data = { vehicle: rentACar.vehicle._id, status: StatusRentACarEnum.AVAILABLE, notes: '', amount: 0 } ;

        this.rentACarService.updateRentACar(data, rentACar.rentACar_id).subscribe({
          next: (resp) => {
            this.getRentACars();
            this.facadeService.toast.success('Procesado con exito');
          },
          error: (err) => {
            this.facadeService.toast.error(err.error.msg);
          }
        });
      }
    });
  }

  private requestInvoice(invoice: IInvoice): IInvoiceRequest {
    return {
      invoiceCode: invoice.invoiceCode,
      invoiceDate: invoice.invoiceDate,
      firstName: invoice.rentacar.customer.firstName,
      lastName: invoice.rentacar.customer.lastName,
      addressCustomer: invoice.rentacar.customer.address,
      emailCustomer: invoice.rentacar.customer.email,
      phoneCustomer: invoice.rentacar.customer.phone,
      amount: invoice.rentacar.amount,
      daysOfRent: invoice.rentacar.daysOfRent,
      deposit: invoice.rentacar.deposit,
      pricePerDay: invoice.rentacar.pricePerDay,
      rentalEndDate: invoice.rentacar.rentalEndDate,
      rentalStartDate: invoice.rentacar.rentalStartDate,
      brad: invoice.rentacar.vehicle.brand.brandVehicle,
      model: invoice.rentacar.vehicle.model.vehicleModel,
      plate: invoice.rentacar.vehicle.plate,
      year: invoice.rentacar.vehicle.year,
      typeVehicle: invoice.rentacar.vehicle.typeVehicle.typeVehicle,
      companyName: this.companyService.company.companyName,
      message: this.companyService.company.message,
      rnc: this.companyService.company.rnc,
      phone: this.companyService.company.phone,
      email: this.companyService.company.email
    } as IInvoiceRequest;
  }
}
