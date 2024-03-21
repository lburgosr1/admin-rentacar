import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { VehicleModelsComponent } from './vehicle-models.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: VehicleModelsComponent, data: { title: 'Modelos Vehiculos'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VehicleModelsRoutingModule { }
