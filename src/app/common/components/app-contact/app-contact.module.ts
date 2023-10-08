import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppContactComponent } from './app-contact.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppContactComponent
  ],
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CollapseModule,
  ],
  exports: [
    AppContactComponent
  ],
  providers: [provideNgxMask()]
})
export class AppContactModule {}
