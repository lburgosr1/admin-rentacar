import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { ConfigurationComponent } from './configuration.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: ConfigurationComponent, data: { title: 'Configuración'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ConfigurationRoutingModule { }
