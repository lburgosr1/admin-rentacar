import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { CustomerSettingComponent } from './customer-setting/customer-setting.component';
import { CustomerGeneralComponent } from './customer-general/customer-general.component';

const routes: Routes = [
  {
    path: APPROUTES.empty,
    component: CustomerSettingComponent,
    data: { title: 'Detalles Del Cliente' },
    children: [
      {
        path: APPROUTES.general,
        component: CustomerGeneralComponent,
        data: { title: 'General' },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerDetailsRoutingModule { }
