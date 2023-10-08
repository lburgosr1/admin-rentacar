import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { UsersComponent } from './users.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: UsersComponent, data: { title: 'Usuarios'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsersRoutingModule { }
