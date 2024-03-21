import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { TypeVehiclesComponent } from './type-vehicles.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: TypeVehiclesComponent, data: { title: 'Tipos de Vehiculos'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TypeVehiclesRoutingModule { }
