import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoFoundComponent } from './common/components/no-found/no-found.component';
import { APPROUTES } from './common/constant/app-routes.constant';

const routes: Routes = [
  { path: APPROUTES.authentication, loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: APPROUTES.register, loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterdModule) },

  { path: APPROUTES.empty, loadChildren: () => import('./components/main/main.module').then(m => m.MainModule) },

  { path: APPROUTES.noFound, component: NoFoundComponent }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
