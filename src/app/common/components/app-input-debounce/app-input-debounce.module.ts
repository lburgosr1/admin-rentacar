import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputDebounceComponent } from './app-input-debounce.component';

@NgModule({
  declarations: [
    InputDebounceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    InputDebounceComponent
  ],
})
export class AppInputDebounceModule {}
