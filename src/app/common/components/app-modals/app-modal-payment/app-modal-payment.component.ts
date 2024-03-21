import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentACar } from 'src/app/common/models/rent-a-car.model';;

@Component({
  templateUrl: './app-modal-payment.component.html',
  styleUrls: ['../modal.component.css']
})
export class AppModalPaymentComponent implements OnInit {

  @Input() rentACar!: RentACar;
  @Output() whenClose = new EventEmitter<boolean>();
  form!: FormGroup;

  constructor(
    private modalRef: BsModalRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  accept(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    this.whenClose.next(true);
    this.modalRef.hide();
  }

  cancel(): void {
    this.modalRef.hide();
  }

  private initForm(): void {
    this.form = this.fb.group({
      amount: [this.rentACar.amount],
      deposit: [this.rentACar.deposit]
    });
  }
}
