import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailsRoutingModule } from './customer-details-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppTabsModule } from 'src/app/common/components/app-tabs/app-tabs.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppErrorMessageFormModule } from 'src/app/common/components/app-error-message-form/app-error-message-form.module';
import { CustomerDetailsComponent } from './customer-details.component';
import { AppNavegationModule } from 'src/app/common/components/app-navegation/app-navegation.module';

@NgModule({
  declarations: [
    CustomerDetailsComponent
  ],
  imports: [
    CustomerDetailsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    AppTabsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AppErrorMessageFormModule,
    AppNavegationModule
  ],
  exports: [
    CustomerDetailsComponent
  ],
  providers: [provideNgxMask()]
})
export class CustomerDetailsModule { }
