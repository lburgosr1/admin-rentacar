import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBreadcrumbsComponent } from './app-breadcrumbs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppBreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AppBreadcrumbsComponent
  ]
})
export class AppBreadcrumbsModule {}
