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
      { path: APPROUTES.users, loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
      { path: APPROUTES.customers, loadChildren: () => import('../customers/customers.module').then(m => m.CustomersModule) },
      { path: APPROUTES.customerDetails, loadChildren: () => import('../customers/customer-details/customer-details.module').then(m => m.CustomerDetailsModule) },
      { path: APPROUTES.vehicles, loadChildren: () => import('../vehicles/vehicles.module').then(m => m.VehiclesModule) },
      { path: APPROUTES.rentACar, loadChildren: () => import('../rent-a-car/rent-a-car.module').then(m => m.RentACarModule) },
      { path: APPROUTES.coins, loadChildren: () => import('../coins/coins.module').then(m => m.CoinsModule) },
      { path: APPROUTES.documents, loadChildren: () => import('../documents/documents.module').then(m => m.DocumentsModule) },
      { path: APPROUTES.employees, loadChildren: () => import('../employess/employees.module').then(m => m.EmployeesModule) },
      { path: APPROUTES.employeeDetails, loadChildren: () => import('../employess/employee-details/employee-details.module').then(m => m.EmployeeDetailsModule) },
      { path: APPROUTES.typeVehicles, loadChildren: () => import('../type-vehicles/type-vehicles.module').then(m => m.TypeVehiclesModule) },
      { path: APPROUTES.brandVehicles, loadChildren: () => import('../brand-vehicles/brand-vehicles.module').then(m => m.BrandVehiclesModule) },
      { path: APPROUTES.vehicleModels, loadChildren: () => import('../vehicle-models/vehicle-models.module').then(m => m.VehicleModelsModule) },
      { path: APPROUTES.companyDetails, loadChildren: () => import('../company/company-details.module').then(m => m.CompanyDetailsModule) },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
