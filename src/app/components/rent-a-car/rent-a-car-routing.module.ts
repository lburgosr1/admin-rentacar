import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { RentACarComponent } from './rent-a-car.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: RentACarComponent, data: { title: 'Vehículos Rentados'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RentACarRoutingModule { }
