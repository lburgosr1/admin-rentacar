import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoadingComponent } from './app-loading.component';

@NgModule({
  declarations: [
    AppLoadingComponent
  ],
  imports: [ CommonModule ],
  exports: [
    AppLoadingComponent
  ],
  providers: [],
})
export class AppLoadingModule {}