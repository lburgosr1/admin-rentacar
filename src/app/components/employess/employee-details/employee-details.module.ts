import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppTabsModule } from 'src/app/common/components/app-tabs/app-tabs.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppErrorMessageFormModule } from 'src/app/common/components/app-error-message-form/app-error-message-form.module';
import { AppNavegationModule } from 'src/app/common/components/app-navegation/app-navegation.module';
import { EmployeeDetailsRoutingModule } from './employee-details-routing.module';
import { EmployeeDetailsComponent } from './employee-details.component';

@NgModule({
  declarations: [
    EmployeeDetailsComponent
  ],
  imports: [
    EmployeeDetailsRoutingModule,
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
    EmployeeDetailsComponent
  ],
  providers: [provideNgxMask()]
})
export class EmployeeDetailsModule { }
