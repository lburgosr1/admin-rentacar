import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { InvoiceComponent } from './invoice.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: InvoiceComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InvoiceRoutingModule { }
