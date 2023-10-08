import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { AuthGuard } from 'src/app/common/guards/auth.guard';
import { MainComponent } from './main.component';
import { AdminGuard } from 'src/app/common/guards/admin.guard';


const routes: Routes = [
  { path: APPROUTES.empty, redirectTo: APPROUTES.dashboard, pathMatch: 'prefix' },
  {
    path: APPROUTES.empty,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: MainComponent,
    children: [
      { path: APPROUTES.dashboard, loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: APPROUTES.accountSettings, loadChildren: () => import('../account-settings/account-setting.module').then(m => m.AccountSettingsModule) },
      { path: APPROUTES.profile, loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
      { path: APPROUTES.users, canActivate: [AdminGuard], loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
      { path: APPROUTES.customers, loadChildren: () => import('../customers/customers.module').then(m => m.CustomersModule) },
      { path: APPROUTES.customerDetails, loadChildren: () => import('../customers/customer-details/customer-details.module').then(m => m.CustomerDetailsModule) },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
