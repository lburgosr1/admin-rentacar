import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandVehicle } from 'src/app/common/models/brand-vehicle.model';

@Component({
  templateUrl: './app-modal-brand-vehicle-details.component.html',
  styleUrls: ['../modal.component.css']
})
export class AppModalBrandVehicleDetailsComponent implements OnInit {

  @Input() brand!: BrandVehicle;
  @Input() isEdit!: boolean;
  @Output() whenClose = new EventEmitter<BrandVehicle>();
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
    const data = {...this.form.value, brandVehicle_id: this.brand._id};
    this.whenClose.next(data);
    this.modalRef.hide();
  }

  cancel(): void {
    this.modalRef.hide();
  }

  private setForm(): void {
    this.form.patchValue({
      brandVehicle: this.brand.brandVehicle
    });
    this.cdr.markForCheck();
  }

  private initForm(): void {
    this.form = this.fb.group({
      brandVehicle: ['', Validators.required]
    });
  }

  get brandVehicle() {
    return this.form.get('brandVehicle');
  }
}
