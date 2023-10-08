import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAddressComponent } from './app-address.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppAddressComponent
  ],
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CollapseModule.forRoot(),
  ],
  exports: [
    AppAddressComponent
  ],
  providers: [provideNgxMask()]
})
export class AppAddressModule {}
