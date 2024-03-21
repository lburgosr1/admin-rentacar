import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { DocumentsComponent } from './documents.component';

const routes: Routes = [
    { path: APPROUTES.empty, component: DocumentsComponent, data: { title: 'Documentos'} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DocumentsRoutingModule { }
