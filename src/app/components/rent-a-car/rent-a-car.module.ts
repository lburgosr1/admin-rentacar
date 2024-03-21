import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentACarComponent } from './rent-a-car.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { RentACarRoutingModule } from './rent-a-car-routing.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    RentACarComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
    RentACarRoutingModule,
    CollapseModule.forRoot(),
  ],
  exports: [],
  providers: [],
})
export class RentACarModule {}
