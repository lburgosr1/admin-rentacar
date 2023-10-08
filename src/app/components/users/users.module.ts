import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    PaginationModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
