import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: CustomersComponent, data: { title: 'Clientes'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CustomersRoutingModule { }
