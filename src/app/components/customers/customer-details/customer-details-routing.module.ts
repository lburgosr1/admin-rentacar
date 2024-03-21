import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { CustomerDetailsComponent } from './customer-details.component';

const routes: Routes = [
  { path: APPROUTES.general, component: CustomerDetailsComponent, data: { title: 'Detalles Del Cliente' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerDetailsRoutingModule { }
