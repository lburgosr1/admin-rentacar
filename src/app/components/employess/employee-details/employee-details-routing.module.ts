import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { EmployeeDetailsComponent } from './employee-details.component';

const routes: Routes = [
  { path: APPROUTES.general, component: EmployeeDetailsComponent, data: { title: 'Detalles Del Empleado' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmployeeDetailsRoutingModule { }
