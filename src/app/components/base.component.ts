import { Component, ElementRef } from '@angular/core';
import { IRoute } from '../common/interfaces/route.interface';
import { FacadeService } from '../common/services/facade.service';
import { BehaviorSubject } from 'rxjs';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent<T = any> {

  route!: IRoute;
  loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  model = {} as T;
  originalModel = {} as T;

  constructor(public facadeService: FacadeService, public elementRef: ElementRef) {
    this.route =  this.facadeService.utils.rebuildRoute(this.facadeService.location.path());
  }

  ngOnDestroy(): void {
    this.loading.next(false);
    this.facadeService.utils.whenFormIsValid$.next(false);
  }

  goBack(): void {
    this.facadeService.location.back();
  }

  startLoading(): void {
    this.loading.next(true);
  }

  finishLoading(): void {
    this.loading.next(false);
  }

  goTo(path: string, params?: object, reload?: boolean): void {
    this.facadeService.ngZone.run(()=>this.navigateTo(path, params, reload));
    window.scrollTo(0, 0);
  }


  private navigateTo(path: string, params?: object, reload?: boolean) {
    if (params && reload) {
      const extras = { skipLocationChange: true, queryParamsHandling: 'merge' };
      this.facadeService.router.navigateByUrl('/', extras).then(() => {
        this.facadeService.router.navigate([path], { queryParams: this.facadeService.utils.transformParamsObj(params)});
      });
    } else if (!params && reload) {
      this.facadeService.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.facadeService.router.navigate([path]);
        });
    } else if (params && !reload) {
      this.facadeService.router.navigate([path], { queryParams: this.facadeService.utils.transformParamsObj(params) });
    } else {
      this.facadeService.router.navigate([path]);
    }
  }

  isValidForm(control: AbstractControl): boolean {
    return control?.invalid &&
    (control?.dirty || control?.touched);
  }

  validDate(validFromDate: string, validToDate: string) {
    return (formGroup: FormGroup) => {
      const validFromDateControl = formGroup.controls[validFromDate];
      const validToDateControl = formGroup.controls[validToDate];

      validToDateControl.setErrors(null);

      if (validFromDateControl.value && validToDateControl.value && validFromDateControl.value > validToDateControl.value) {
        validToDateControl.setErrors({ wrongDate: true });
      }
    };
  }

  get hiddenForRole$() {
    return this.facadeService.user.hiddenForRole$;
  }

  get isLoading$() {
		return this.loading.asObservable();
	}
}
