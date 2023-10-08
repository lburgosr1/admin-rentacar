import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeCollection } from '../constant/enums.constant';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string | undefined, type: number): unknown {
    if(image) {
      return `${base_url}/upload/${TypeCollection[type]}/${image}`;
    } else {
      return `${base_url}/upload/${TypeCollection[type]}/no-image`;
    }
  }

}
