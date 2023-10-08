import { NgModule } from '@angular/core';
import { FormControlTransForm } from './form-group.pipe';

import { ImagePipe } from './image.pipe';
import { TypeContactTransFrom } from './type-contact.pipe';
import { TypeTransactionPipe } from './type-transaction.pipe';


@NgModule({
  declarations: [
    ImagePipe,
    FormControlTransForm,
    TypeContactTransFrom,
    TypeTransactionPipe
  ],
  exports: [
    ImagePipe,
    FormControlTransForm,
    TypeTransactionPipe,
    TypeContactTransFrom
  ]
})
export class AppPipesModule { }
