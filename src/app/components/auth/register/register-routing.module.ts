import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { RegisterComponent } from './register.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: RegisterComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RegisterRoutingModule { }
