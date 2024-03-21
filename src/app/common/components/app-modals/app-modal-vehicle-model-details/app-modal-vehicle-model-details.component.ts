import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleModel } from 'src/app/common/models/vehicle-model.model';
import { BrandVehicle } from 'src/app/common/models/brand-vehicle.model';

@Component({
  templateUrl: './app-modal-vehicle-model-details.component.html',
  styleUrls: ['../modal.component.css']
})
export class AppModalVehicleModelDetailsComponent implements OnInit {

  @Input() model!: VehicleModel;
  @Input() brands: BrandVehicle[] = [];
  @Input() isEdit!: boolean;
  @Output() whenClose = new EventEmitter<VehicleModel>();
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
    const data = {...this.form.value, vehicleModel_id: this.model._id};
    this.whenClose.next(data);
    this.modalRef.hide();
  }

  cancel(): void {
    this.modalRef.hide();
  }

  private setForm(): void {
    const brand = this.model.brand as BrandVehicle;
    this.form.patchValue({
      vehicleModel: this.model.vehicleModel,
      brand: brand._id
    });
    this.cdr.markForCheck();
  }

  private initForm(): void {
    this.form = this.fb.group({
      vehicleModel: ['', Validators.required],
      brand: ['', Validators.required]
    });
  }

  get vehicleModel() {
    return this.form.get('vehicleModel');
  }

  get brand() {
    return this.form.get('brand');
  }
}
