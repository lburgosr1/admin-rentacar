import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppTabsComponent } from './app-tabs.component';
import { ValidStepDirective } from '../../directives/valid-step.directive';

@NgModule({
  declarations: [
    AppTabsComponent,
    ValidStepDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
  ],
  exports: [
    AppTabsComponent
  ]
})
export class AppTabsModule { }
