import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModalCustomMessageComponent } from './custom-message/app-modal-custom-message.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { AppPipesModule } from '../../pipes/app-pipes.module';
import { AppErrorMessageFormModule } from '../app-error-message-form/app-error-message-form.module';
import { AppModalEditOrNewContactComponent } from './edit-or-new-contact/app-modal-edit-or-new-contact.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppModalEditOrNewAddressComponent } from './edit-or-new-address/app-modal-edit-or-new-address.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppModalCustomMessageComponent,
    AppModalEditOrNewContactComponent,
    AppModalEditOrNewAddressComponent
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
    NgxSkeletonLoaderModule
  ],
  exports: [
    AppModalCustomMessageComponent,
    AppModalEditOrNewContactComponent,
    AppModalEditOrNewAddressComponent
  ],
  providers: [provideNgxMask()]
})
export class AppModalsModule {}
