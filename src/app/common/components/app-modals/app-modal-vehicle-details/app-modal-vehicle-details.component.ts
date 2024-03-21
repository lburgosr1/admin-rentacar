import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/common/models/vehicle.model';
import { BrandVehicle } from 'src/app/common/models/brand-vehicle.model';
import { TypeVehicle } from 'src/app/common/models/type-vehicle.model';
import { VehicleModel } from 'src/app/common/models/vehicle-model.model';
import { VehicleModelService } from 'src/app/common/services/vehicle-model.service';
import { IVehicleModelsByBrandResponse } from 'src/app/common/interfaces/vehicle-model.interface';

@Component({
  templateUrl: './app-modal-vehicle-details.component.html',
  styleUrls: ['../modal.component.css']
})
export class AppModalVehicleDetailsComponent implements OnInit {

  @Input() vehicle!: Vehicle;
  @Input() isEdit!: boolean;
  @Input() brands: BrandVehicle[] = [];
  @Input() typeVehicles: TypeVehicle[] = [];
  @Output() whenClose = new EventEmitter<Vehicle>();

  form!: FormGroup;
  imageUpload!: File;
  imgTemp: any = '';
  models: VehicleModel[] = [];

  constructor(
    private modalRef: BsModalRef,
    private cdr: ChangeDetectorRef,
    private vehicleModelService: VehicleModelService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.isEdit) {
      this.getVehicleModelsByBrand(this.vehicle.brand._id);
      this.setForm();
    }

    this.brand?.valueChanges.subscribe((value: string) => {
      this.getVehicleModelsByBrand(value);
    });


  }

  accept(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    const data = {
      ...this.form.value,
      vehicle_id: this.vehicle.vehicle_id,
      imageUpload: this.imageUpload
    };
    this.whenClose.next(data);
    this.modalRef.hide();
  }

  cancel(): void {
    this.modalRef.hide();
  }

  changeImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      this.imageUpload = event?.target?.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        var img = new Image;
        this.imgTemp = event?.target?.result;
        img.src = event?.target?.result as string;
        console.log(img.width);
      }
    }
  }

  private getVehicleModelsByBrand(brandId: string): void {
    this.vehicleModelService.getVehicleModelsByBrand(brandId).subscribe({
      next: (resp: IVehicleModelsByBrandResponse) => {
        this.models = resp.models;
        this.cdr.detectChanges();

      },
      error: (err) => {
        this.models = [];
      }
    });
  }

  private setForm(): void {
    const typeVehicle = this.vehicle.typeVehicle as TypeVehicle;
    const brand = this.vehicle.brand as BrandVehicle;
    const model = this.vehicle.model as VehicleModel;
    this.form.patchValue({
      typeVehicle: typeVehicle._id,
      brand: brand._id,
      model: model?._id,
      plate: this.vehicle.plate,
      year: this.vehicle.year
    });
    this.cdr.markForCheck();
  }

  private initForm(): void {
    this.form = this.fb.group({
      typeVehicle: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      plate: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  get typeVehicle() {
    return this.form.get('typeVehicle');
  }
  get brand() {
    return this.form.get('brand');
  }
  get model() {
    return this.form.get('model');
  }
  get plate() {
    return this.form.get('plate');
  }
  get year() {
    return this.form.get('year');
  }
}
