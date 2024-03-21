import { Injectable, Injector, NgZone } from '@angular/core';
import { UtilsService } from './utils.service';
import { Location } from '@angular/common';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  private _utils!: UtilsService;
  private _location!: Location;
  private _user!: UserService;
  private _router!: Router;
  private _ngZone!: NgZone;
  private _activatedRoute!: ActivatedRoute;
  private _toast!: ToastrService;

  constructor(private injector: Injector) {}

  get utils() {
    if (!this._utils) {
      this._utils = this.injector.get(UtilsService);
    }
    return this._utils;
  }

  get location() {
    if (!this._location) {
      this._location = this.injector.get(Location);
    }
    return this._location;
  }

  get user() {
    if (!this._user) {
      this._user = this.injector.get(UserService);
    }
    return this._user;
  }

  get router() {
    if (!this._router) {
      this._router = this.injector.get(Router);
    }
    return this._router;
  }

  get ngZone() {
    if (!this._ngZone) {
      this._ngZone = this.injector.get(NgZone);
    }
    return this._ngZone;
  }

  get activatedRoute() {
    if (!this._activatedRoute) {
      this._activatedRoute = this.injector.get(ActivatedRoute);
    }
    return this._activatedRoute;
  }

  get toast() {
    if (!this._toast) {
      this._toast = this.injector.get(ToastrService);
    }
    return this._toast;
  }
}
