import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { AppErrorMessageFormModule } from 'src/app/common/components/app-error-message-form/app-error-message-form.module';
import { AppInputDebounceModule } from 'src/app/common/components/app-input-debounce/app-input-debounce.module';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    RegisterRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppErrorMessageFormModule,
    AppInputDebounceModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterdModule { }
