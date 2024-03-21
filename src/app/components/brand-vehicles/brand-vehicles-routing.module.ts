import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { BrandVehiclesComponent } from './brand-vehicles.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: BrandVehiclesComponent, data: { title: 'Marcas Vehiculos'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BrandVehiclesRoutingModule { }
