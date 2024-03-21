import { Component, ElementRef, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FacadeService } from 'src/app/common/services/facade.service';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { InvoiceService } from 'src/app/common/services/invoice.service';

interface IInvoice {
  invoiceCode: string;
  invoiceDate: string;
  firstName: string;
  lastName: string;
  addressCustomer: string;
  emailCustomer: string;
  phoneCustomer: string;
  amount: number;
  daysOfRent: number;
  deposit: number;
  pricePerDay: number;
  rentalEndDate: Date
  rentalStartDate: Date
  brad: string;
  model: string;
  plate: string;
  year: string;
  typeVehicle: string
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent extends BaseComponent implements OnInit {
  invoice!: IInvoice;
  urlParams = {} as IUrlParams;

  constructor(
    private invoiceService: InvoiceService,
    facadeService: FacadeService,
    elementRef: ElementRef) {
    super(facadeService, elementRef);
  }

  ngOnInit(): void {
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.invoice = this.facadeService.utils.transformParamsObj(params) as IInvoice;
    });
  }

  getInvoice(): void {
    this.invoiceService.getInvoice(this.urlParams.invoiceId).subscribe({
      next: (resp) => {
        console.log(resp);
        this.invoice = resp.invoice[0];
        this.generatePDF();
      }
    });
  }

  generatePDF() {
    const url = this.facadeService.router.serializeUrl(this.facadeService.router.createUrlTree([`/${APPROUTES.invoice}`], { queryParams: { invoiceId: this.urlParams.invoiceId } }));
    const data = {
      url: `http://localhost:4200${url}`
    }
    console.log(`http://localhost:4200${url}`);
    this.invoiceService.createInvoice(data).subscribe({
      next: (resp) => {
        console.log(resp);
        const file = new Blob([resp], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    })
  }
}
