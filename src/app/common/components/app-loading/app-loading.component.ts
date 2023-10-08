import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './app-loading.component.html'
})
export class AppLoadingComponent {

  @Input() loading = false;

  constructor() {}

}
