import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from '../../components/auth/login/login.component';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';

const routes: Routes = [
  { path: APPROUTES.empty, component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
