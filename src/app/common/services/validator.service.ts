import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  namePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedeSerStrider(control: FormControl): ValidationErrors | null {
    const valor = control.value?.trim().toLowerCase();

    if (valor === 'strider') {
      return {
        noStrider: true
      }
    }

    return null;
  }

  similarFormFields(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;

      if(pass1 !== pass2) {
        formGroup.get(field2)?.setErrors({noEquals: true});
        return {noEquals: true};
      }

      formGroup.get(field2)?.setErrors(null);

      return null;
    }
  }

  validToAndFromDate(validFromDate: string, validToDate: string) {
    return (formGroup: FormGroup) => {
      const validFromDateControl = formGroup.controls[validFromDate];
      const validToDateControl = formGroup.controls[validToDate];

      validToDateControl.setErrors(null);

      if (validFromDateControl.value && validToDateControl.value && validFromDateControl.value > validToDateControl.value) {
        validToDateControl.setErrors({ wrongDate: true });
      }
    };
  }
}
