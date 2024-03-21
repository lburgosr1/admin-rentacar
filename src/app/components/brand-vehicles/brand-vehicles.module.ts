import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandVehiclesComponent } from './brand-vehicles.component';
import { BrandVehiclesRoutingModule } from './brand-vehicles-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    BrandVehiclesComponent
  ],
  imports: [
    CommonModule,
    BrandVehiclesRoutingModule,
    PaginationModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  exports: [],
  providers: [],
})
export class BrandVehiclesModule { }
