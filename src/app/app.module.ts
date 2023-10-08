import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NoFoundComponent } from './common/components/no-found/no-found.component';
import { ToastrModule } from 'ngx-toastr';
import { AppPipesModule } from './common/pipes/app-pipes.module';
import { AppModalsModule } from './common/components/app-modals/app-modals.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    NoFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppPipesModule,
    AppModalsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    PaginationModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
