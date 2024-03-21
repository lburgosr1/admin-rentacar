import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModalCustomMessageComponent } from './custom-message/app-modal-custom-message.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { AppPipesModule } from '../../pipes/app-pipes.module';
import { AppErrorMessageFormModule } from '../app-error-message-form/app-error-message-form.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppModalCoinDetailsComponent } from './app-modal-coin-details/app-modal-coin-details.component';
import { AppModalDocumentDetailsComponent } from './app-modal-document-details/app-modal-document-details.component';
import { AppModalVehicleDetailsComponent } from './app-modal-vehicle-details/app-modal-vehicle-details.component';
import { AppModalTypeVehicleDetailsComponent } from './app-modal-type-vehicle-details/app-modal-type-vehicle-details.component';
import { AppModalBrandVehicleDetailsComponent } from './app-modal-brand-vehicle-details/app-modal-brand-vehicle-details.component';
import { AppModalVehicleModelDetailsComponent } from './app-modal-vehicle-model-details/app-modal-vehicle-model-details.component';
import { AppInputDebounceModule } from '../app-input-debounce/app-input-debounce.module';
import { AppModalRentACarDetailsComponent } from './app-modal-rent-a-car-details/app-modal-rent-a-car-details.component';
import { AppModalPaymentComponent } from './app-modal-payment/app-modal-payment.component';

@NgModule({
  declarations: [
    AppModalCustomMessageComponent,
    AppModalCoinDetailsComponent,
    AppModalDocumentDetailsComponent,
    AppModalVehicleDetailsComponent,
    AppModalTypeVehicleDetailsComponent,
    AppModalBrandVehicleDetailsComponent,
    AppModalVehicleModelDetailsComponent,
    AppModalRentACarDetailsComponent,
    AppModalPaymentComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    AppPipesModule,
    AppErrorMessageFormModule,
    NgxMaskDirective,
    NgxMaskPipe,
    BsDatepickerModule,
    NgxSkeletonLoaderModule,
    AppInputDebounceModule
  ],
  exports: [
    AppModalCustomMessageComponent,
    AppModalCoinDetailsComponent,
    AppModalDocumentDetailsComponent,
    AppModalVehicleDetailsComponent,
    AppModalTypeVehicleDetailsComponent,
    AppModalBrandVehicleDetailsComponent,
    AppModalVehicleModelDetailsComponent,
    AppModalRentACarDetailsComponent,
    AppModalPaymentComponent
  ],
  providers: [provideNgxMask()]
})
export class AppModalsModule {}
