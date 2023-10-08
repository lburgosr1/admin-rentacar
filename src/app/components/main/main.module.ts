import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppBreadcrumbsModule } from 'src/app/common/components/app-breadcrumbs/app-breadcrumbs.module';
import { AppHeaderModule } from 'src/app/common/components/app-header/app-header.module';
import { MainComponent } from './main.component';
import { AppSidebarModule } from 'src/app/common/components/app-sidebar/app-sidebar.module';
import { MainRoutingModule } from './main.routing.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppHeaderModule,
    AppBreadcrumbsModule,
    AppSidebarModule,
    MainRoutingModule
  ]
})
export class MainModule { }
