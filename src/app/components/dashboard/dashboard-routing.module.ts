import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: DashboardComponent, data: { title: 'Dashboard'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }
