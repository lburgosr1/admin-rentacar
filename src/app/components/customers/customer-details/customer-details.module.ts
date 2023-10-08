import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailsRoutingModule } from './customer-details-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppContactModule } from 'src/app/common/components/app-contact/app-contact.module';
import { AppTabsModule } from 'src/app/common/components/app-tabs/app-tabs.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppErrorMessageFormModule } from 'src/app/common/components/app-error-message-form/app-error-message-form.module';
import { CustomerGeneralComponent } from './customer-general/customer-general.component';
import { CustomerSettingComponent } from './customer-setting/customer-setting.component';
import { AppAddressModule } from 'src/app/common/components/app-address/app-address.module';
import { AppNavegationModule } from 'src/app/common/components/app-navegation/app-navegation.module';


@NgModule({
  declarations: [
    CustomerGeneralComponent,
    CustomerSettingComponent
  ],
  imports: [
    CustomerDetailsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    AppContactModule,
    AppAddressModule,
    AppTabsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AppErrorMessageFormModule,
    AppNavegationModule
  ],
  exports: [
    CustomerGeneralComponent
  ],
  providers: [provideNgxMask()]
})
export class CustomerDetailsModule { }
