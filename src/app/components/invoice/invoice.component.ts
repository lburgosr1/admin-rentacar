import { Component, ElementRef, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { FacadeService } from 'src/app/common/services/facade.service';
import { IInvoiceRequest } from 'src/app/common/interfaces/invoice.interface';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent extends BaseComponent implements OnInit {
  invoice!: IInvoiceRequest;
  urlParams = {} as IUrlParams;

  constructor(
    facadeService: FacadeService,
    elementRef: ElementRef) {
    super(facadeService, elementRef);
  }

  ngOnInit(): void {
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.invoice = this.facadeService.utils.transformParamsObj(params) as IInvoiceRequest;
    });
  }
}
