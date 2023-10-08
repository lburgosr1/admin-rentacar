import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFilterComponent } from './app-filter.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { AppPipesModule } from '../../pipes/app-pipes.module';

@NgModule({
  declarations: [
    AppFilterComponent
  ],
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CollapseModule,
    FormsModule,
    AppPipesModule
  ],
  exports: [
    AppFilterComponent
  ],
  providers: [provideNgxMask()]
})
export class AppFilterModule {}
