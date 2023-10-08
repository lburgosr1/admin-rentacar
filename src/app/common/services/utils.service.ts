import { Injectable } from '@angular/core';
import { IRoute } from '../interfaces/route.interface';
import { IUrlParams } from '../constant/url-params';
import { BehaviorSubject, Subject } from 'rxjs';
import { Currency } from '../constant/enums.constant';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  whenFormIsValid$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  whenCLickSave$: Subject<boolean> = new Subject();

  rebuildRoute(route: string): IRoute {
    const routeRebuild = {} as IRoute;
    const routeSplit = decodeURIComponent(route).split('?');
    routeRebuild.url = routeSplit[0];
    routeRebuild.parentUrl = routeRebuild.url.split('/')[1];
    routeSplit.splice(0, 1);
    let paramObj = '{';

    for (let i = 0; i < routeSplit.length; i++) {
      const items = routeSplit[i].split('=');
      paramObj += '"' + items[0] + '":"' + items[1] + '"';

      if (i + 1 < routeSplit.length) {
        paramObj += ',';
      }
    }

    paramObj += '}';

    routeRebuild.params = this.transformParamsObj(JSON.parse(paramObj)) as IUrlParams;

    return routeRebuild;
  }

  transformParamsObj(object: any): any {

    if (typeof object === 'string') {
      object = JSON.parse(object);
    }

    const result = {} as any;
    for (const key in object) {
      if (object[key]) {
        if (object[key] === 'false' || object[key] === 'true') {
          result[key] = JSON.parse(object[key]);
        } else if (this.isNumeric(object[key])) {
          result[key] = JSON.parse(object[key]);
        } else if (object[key]) {
          result[key] = object[key];
        }
      }
    }
    return result;
  }

  isNumeric(str: any): boolean {
    if (typeof str != 'string') return false;
    return !isNaN(str as any) && !isNaN(parseFloat(str));
  }

  isJSON(item: any): boolean {
    item = typeof item !== 'string' ? JSON.stringify(item) : item;

    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }

    if (typeof item === 'object' && item !== null) {
      return true;
    }

    return false;
  }

  camelCase(str: string): string {
    const words = str.split(" ");

    return words.map((word) => {
      return word.length ? word[0].toUpperCase() + word.substring(1) : '';
    }).join(" ");
  }


  isValidForm(obj1: any, obj2: any, isFormValid: boolean, isEdit = false): void {
    if (isEdit) {
      if (Object.keys(obj1).length && Object.keys(obj2).length) {
        if (obj1) {
          if (this.validateObject(obj1, obj2)) {
            this.whenFormIsValid$.next(false);
          } else {
            this.whenFormIsValid$.next(true);
          }
        } else {
          this.whenFormIsValid$.next(true);
        }
      } else {
        this.whenFormIsValid$.next(false);
      }
    } else {
      this.whenFormIsValid$.next(isFormValid);
    }
  }

  getAllCurrency(): Array<Currency> {
    return [
      Currency.EUR,
      Currency.RD,
      Currency.US
    ];
  }

  private validateObject(obj1: any, obj2: any): boolean {
    const keys1: any = Object.keys(obj1);
    const keys2: any = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      let val1 = obj1[key];
      let val2 = obj2[key];
      let areObjects = this.isObject(val1) && this.isObject(val2);

      if (
        (areObjects && !this.validateObject(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) return false;
    }

    return true;
  }

  private isObject(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
}
