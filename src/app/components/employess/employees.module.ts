import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { FormsModule } from '@angular/forms';
import { AppPipesModule } from 'src/app/common/pipes/app-pipes.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    EmployeesRoutingModule,
    CommonModule,
    FormsModule,
    AppPipesModule,
    NgxSkeletonLoaderModule,
    PaginationModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [
    EmployeesComponent
  ]
})
export class EmployeesModule {}
