import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice-routing.module';

@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    InvoiceRoutingModule,
    CommonModule,
    PaginationModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [],
  providers: [],
})
export class InvoiceModule {}
