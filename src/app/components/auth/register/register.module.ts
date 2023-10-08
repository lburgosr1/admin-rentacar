import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    RegisterRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterdModule { }
