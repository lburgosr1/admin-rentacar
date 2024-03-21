import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeVehiclesComponent } from './type-vehicles.component';
import { TypeVehiclesRoutingModule } from './type-vehicles-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    TypeVehiclesComponent
  ],
  imports: [
    CommonModule,
    TypeVehiclesRoutingModule,
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
export class TypeVehiclesModule { }
