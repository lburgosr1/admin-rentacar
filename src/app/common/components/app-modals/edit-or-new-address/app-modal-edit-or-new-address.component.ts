import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modal, IModalCustomMessage } from '../modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAddress, TypeAddress } from 'src/app/common/interfaces/address.interface';

@Component({
  templateUrl: './app-modal-edit-or-new-address.component.html',
  styleUrls: ['../modal.component.scss'],
})
export class AppModalEditOrNewAddressComponent implements OnInit {

  @Input() address!: IAddress;
  @Output() whenClose = new EventEmitter<IAddress>();
  form!: FormGroup;
  newForm!: FormGroup;
  modal!: IModalCustomMessage;
  showAdditionalBody!: boolean;
  types = [TypeAddress.Office, TypeAddress.Home];

  constructor(private modalRef: BsModalRef, private cdr: ChangeDetectorRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.modal) {
      this.modal = new Modal();
    }

    if (this.modal.bodyAdditional === '') {
      this.showAdditionalBody = true;
    }

    this.inicilizeForm();
  }

  accept(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    if (this.address) {
      const data = { ...this.form.value, _id: this.address._id }
      this.whenClose.emit(data);
    } else {
      this.whenClose.emit(this.form.value);
    }
    this.modalRef.hide();
  }

  cancel(): void {
    this.modalRef.hide();
  }

  set(modal: IModalCustomMessage): void {
    this.modal = modal;
    this.cdr.markForCheck();
  }

  decline(): void {
    this.modalRef.hide();
  }

  inicilizeForm(): void {
    if (this.address) {
      this.form = this.fb.group({
        type: [this.address.type],
        street: [this.address.street],
        number: [this.address.number],
        building: [this.address.building],
        apartment: [this.address.apartment],
        sector: [this.address.sector],
        city: [this.address.city],
        isPrimary: [this.address.isPrimary]
      });
    } else {
      this.form = this.fb.group({
        type: [''],
        street: [''],
        number: [''],
        building: [''],
        apartment: [''],
        sector: [''],
        city: [''],
        isPrimary: [false]
      });
    }
  }

  get type() {
    return this.form.get('type');
  }

  get street() {
    return this.form.get('street');
  }

  get number() {
    return this.form.get('number');
  }

  get building() {
    return this.form.get('building');
  }

  get apartment() {
    return this.form.get('apartment');
  }

  get sector() {
    return this.form.get('sector');
  }

  get city() {
    return this.form.get('city');
  }

  get isPrimary() {
    return this.form.get('isPrimary');
  }
}
