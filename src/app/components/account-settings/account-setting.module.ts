import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { AccountSettingsComponent } from './account-settings.component';


@NgModule({
  declarations: [
    AccountSettingsComponent
  ],
  imports: [
    AccountSettingsRoutingModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    AccountSettingsComponent
  ]
})
export class AccountSettingsModule { }
