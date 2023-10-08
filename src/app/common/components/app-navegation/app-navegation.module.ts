import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavegationComponent } from './app-navegation.component';

@NgModule({
  declarations: [
    AppNavegationComponent
  ],
  imports: [ CommonModule ],
  exports: [
    AppNavegationComponent
  ],
  providers: [],
})
export class AppNavegationModule {}
