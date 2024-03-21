import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { CoinsComponent } from './coins.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: CoinsComponent, data: { title: 'Monedas'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CoinsRoutingModule { }
