import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { EmployeesComponent } from './employees.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: EmployeesComponent, data: { title: 'Empleados'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EmployeesRoutingModule { }
