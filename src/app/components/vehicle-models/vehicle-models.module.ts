import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { VehicleModelsComponent } from './vehicle-models.component';
import { VehicleModelsRoutingModule } from './vehicle-models-routing.module';

@NgModule({
  declarations: [
    VehicleModelsComponent
  ],
  imports: [
    CommonModule,
    VehicleModelsRoutingModule,
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
export class VehicleModelsModule { }
