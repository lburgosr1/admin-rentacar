import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { formValidator } from '../../constant/form-validator.constant';

@Component({
  selector: 'app-error-message-form',
  templateUrl: './app-error-message-form.component.html',
  styleUrls: ['./app-error-message-form.component.scss'],
})
export class AppErrorMessageFormComponent implements OnInit {
  @Input() abstractControl!: AbstractControl | null;
  @Input() formControlGroup!: FormGroup;
  @Input() control!: string;
  @Input() controlName: string = '';

  constructor() { }

  ngOnInit(): void {
    this.formControlGroup;
  }

  get errorMessages() {
    return formValidator;
  }
}
