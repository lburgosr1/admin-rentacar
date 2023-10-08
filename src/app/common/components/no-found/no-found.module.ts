import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoFoundComponent } from './no-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NoFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NoFoundComponent
  ],
  providers: [],
})
export class NoFoundModule {}
