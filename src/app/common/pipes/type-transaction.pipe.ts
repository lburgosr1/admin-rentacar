import { Pipe, PipeTransform } from '@angular/core';
import { TypeTransaction } from '../constant/enums.constant';

@Pipe({name: 'typeTransaction'})
export class TypeTransactionPipe implements PipeTransform {
  transform(value: string): string {
    if(TypeTransaction.BankCheck.toLowerCase() === value.toLowerCase()) {
      return 'Cheque';
    } else if(TypeTransaction.Cash.toLowerCase() === value.toLowerCase()) {
      return 'Efectivo';
    } else if(TypeTransaction.CrediCard.toLowerCase() === value.toLowerCase()) {
      return 'Tarjeta de Credito';
    } else if(TypeTransaction.CreditNote.toLowerCase() === value.toLowerCase()) {
      return 'Nota de Credito';
    }else if(TypeTransaction.Discount.toLowerCase() === value.toLowerCase()) {
      return 'Descuento';
    } else if(TypeTransaction.TaxExemption.toLowerCase() === value.toLowerCase()) {
      return 'Exoneracion de Impuesto';
    } else {
      return 'Transferencia'
    }
  }
}
