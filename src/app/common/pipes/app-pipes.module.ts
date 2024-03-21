import { NgModule } from '@angular/core';
import { FormControlTransForm } from './form-group.pipe';

import { ImagePipe } from './image.pipe';


@NgModule({
  declarations: [
    ImagePipe,
    FormControlTransForm
  ],
  exports: [
    ImagePipe,
    FormControlTransForm,
  ]
})
export class AppPipesModule { }
