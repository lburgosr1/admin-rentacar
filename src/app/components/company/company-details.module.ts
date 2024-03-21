import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyDetailsRoutingModule } from './company-details-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppTabsModule } from 'src/app/common/components/app-tabs/app-tabs.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppErrorMessageFormModule } from 'src/app/common/components/app-error-message-form/app-error-message-form.module';
import { AppNavegationModule } from 'src/app/common/components/app-navegation/app-navegation.module';
import { CompanyDetailsComponent } from './company-details.component';

@NgModule({
  declarations: [
    CompanyDetailsComponent
  ],
  imports: [
    CompanyDetailsRoutingModule,
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
    CompanyDetailsComponent
  ],
  providers: [provideNgxMask()]
})
export class CompanyDetailsModule { }
