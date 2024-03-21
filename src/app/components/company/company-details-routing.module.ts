import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { CompanyDetailsComponent } from './company-details.component';

const routes: Routes = [
  { path: APPROUTES.general, component: CompanyDetailsComponent, data: { title: 'Detalles De La Compañia' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompanyDetailsRoutingModule { }
