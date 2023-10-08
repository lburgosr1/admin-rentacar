import { Pipe, PipeTransform } from '@angular/core';
import { TypeContact } from 'src/app/common/interfaces/contact.interface';

@Pipe({
  name: 'typeContact'
})
export class TypeContactTransFrom implements PipeTransform {

  transform(type: string): string {
    if(TypeContact.Home === type) {
      return 'Residencial';
    } else if(TypeContact.CellPhone === type) {
      return 'Celular';
    } else {
      return 'Oficina';
    }
  }

}
