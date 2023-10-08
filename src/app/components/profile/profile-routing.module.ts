import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: ProfileComponent, data: { title: 'Perfil'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProfileRoutingModule { }
