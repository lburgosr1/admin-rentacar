import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsComponent } from './coins.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CoinsRoutingModule } from './coins-routing.module';

@NgModule({
  declarations: [
    CoinsComponent
  ],
  imports: [
    CoinsRoutingModule,
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
export class CoinsModule {}
