import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { AppPipesModule } from 'src/app/common/pipes/app-pipes.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CustomersRoutingModule,
    CommonModule,
    FormsModule,
    AppPipesModule,
    NgxSkeletonLoaderModule,
    PaginationModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [
    CustomersComponent
  ]
})
export class CustomersModule { }
