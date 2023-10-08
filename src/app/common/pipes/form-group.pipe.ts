import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TypeContact } from 'src/app/common/interfaces/contact.interface';

@Pipe({
  name: 'formGroup'
})
export class FormControlTransForm implements PipeTransform {

  transform(control: any): FormGroup {
    return control as FormGroup;
  }

}
