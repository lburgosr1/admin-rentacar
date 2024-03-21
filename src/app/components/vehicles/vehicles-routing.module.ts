import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { VehiclesComponent } from './vehicles.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: VehiclesComponent, data: { title: 'Vehículos'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VehiclesRoutingModule { }
