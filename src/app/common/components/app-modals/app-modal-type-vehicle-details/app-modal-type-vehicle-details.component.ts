import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeVehicle } from 'src/app/common/models/type-vehicle.model';

@Component({
  templateUrl: './app-modal-type-vehicle-details.component.html',
  styleUrls: ['../modal.component.css']
})
export class AppModalTypeVehicleDetailsComponent implements OnInit {

  @Input() type!: TypeVehicle;
  @Input() isEdit!: boolean;
  @Output() whenClose = new EventEmitter<TypeVehicle>();
  form!: FormGroup;

  constructor(
    private modalRef: BsModalRef,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.isEdit) {
      this.setForm();
    }
  }

  accept(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    const data = {...this.form.value, type_vehicle_id: this.type.type_vehicle_id};
    this.whenClose.next(data);
    this.modalRef.hide();
  }

  cancel(): void {
    this.modalRef.hide();
  }

  private setForm(): void {
    this.form.patchValue({
      typeVehicle: this.type.typeVehicle
    });
    this.cdr.markForCheck();
  }

  private initForm(): void {
    this.form = this.fb.group({
      typeVehicle: ['', Validators.required]
    });
  }

  get typeVehicle() {
    return this.form.get('typeVehicle');
  }
}
