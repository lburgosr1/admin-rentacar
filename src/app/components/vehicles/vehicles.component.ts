import { Component, ElementRef, OnInit, Type } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { Vehicle } from 'src/app/common/models/vehicle.model';
import { FacadeService } from 'src/app/common/services/facade.service';
import { VehicleService } from 'src/app/common/services/vehicle.service';
import { BaseComponent } from '../base.component';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';
import { VehicleStatusEnum } from 'src/app/common/constant/enums.constant';
import { VehiclesModule } from './vehicles.module';
import { AppModalVehicleDetailsComponent } from 'src/app/common/components/app-modals/app-modal-vehicle-details/app-modal-vehicle-details.component';
import { IVehicle } from 'src/app/common/interfaces/vehicle.interface';
import { TypeVehicleService } from 'src/app/common/services/type-vehicle.service';
import { BrandVehicleService } from 'src/app/common/services/brand-vehicle.service';
import { BrandVehicle } from 'src/app/common/models/brand-vehicle.model';
import { TypeVehicle } from 'src/app/common/models/type-vehicle.model';
import { FileUploadService } from 'src/app/common/services/file-upload.service';

enum StatusVehicleEnum  {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  RENTTED = 'rented'
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent extends BaseComponent implements OnInit {
  vehicles!: Vehicle[];
  pagination!: IPagination;
  txtTerm: string = '';
  status!: string;
  vehicleStatus = [VehiclesModule];
  urlParams = {} as IUrlParams;
  brands: BrandVehicle[] = [];
  typeVehicles: TypeVehicle[] = [];

  constructor(
    private vehicleService: VehicleService,
    private modal: BsModalService,
    private typeVehicleService: TypeVehicleService,
    private brandService: BrandVehicleService,
    private fileUploadService: FileUploadService,
    facadeService: FacadeService,
    elementRef: ElementRef) {
    super(facadeService, elementRef);
  }

  ngOnInit(): void {
    this.pagination = new Pagination();
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.urlParams = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
      this.urlParams.term ? this.txtTerm = this.urlParams.term : '';
      this.urlParams?.vehicleStatus ? this.status = this.urlParams.vehicleStatus :
      this.status = VehicleStatusEnum.Active;
      this.urlParams?.page ? this.urlParams.page : this.urlParams.page = this.pagination.page;
      this.getVehicles();
    });
    this.getBrands();
    this.getTypeVehicles();
  }

  getVehicles(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term,
      status: this.status
    } as any;

    const paramsURL = new URLSearchParams(params);

    this.vehicleService.getVehicles(`${paramsURL}`).subscribe({
      next: (resp) => {
        this.vehicles = resp.vehicles;
        this.pagination.totalRecord = resp.total;
        this.finishLoading();
      },
      error: () => {
        this.finishLoading();
      }
    });
  }

  pageChanged(event: any) {
    this.urlParams.page = event.page;
    this.getVehicles();
  }

  search(): void {
    this.urlParams.term = this.txtTerm;
    this.goTo(APPROUTES.vehicles);
  }

  clearSearch(): void {
    if (!this.txtTerm) {
      return;
    }
    this.txtTerm = '';
    this.urlParams.term = '';
    this.goTo(APPROUTES.vehicles);
  }

  changeStatus(): void {
    this.urlParams.vehicleStatus = this.status;
    this.goTo(APPROUTES.vehicles, this.urlParams);
  }

  createVehicle(vehicle?: Vehicle): void {
    let initialState;
    let isEdit = vehicle ? true : false;

    if (vehicle) {
      initialState = {
        vehicle,
        typeVehicles: this.typeVehicles,
        brands: this.brands,
        isEdit
      };
    } else {
      const vehicle = {} as Vehicle;
      initialState = {
        vehicle,
        typeVehicles: this.typeVehicles,
        brands: this.brands,
        isEdit
      };
    }

    const modalRef = this.modal.show(AppModalVehicleDetailsComponent, { class: 'modal-lg modal-dialog-centered', initialState });
    modalRef?.content?.whenClose.subscribe((vehicle: Vehicle) => {
      if (vehicle) {
        if (!isEdit) {
          this.vehicleService.createVehicle(vehicle).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('El vehiculo fue agregada con exito');
              if(vehicle.imageUpload) {
                this.uploadImage(vehicle.imageUpload, resp.vehicle.vehicle_id);
              } else {
                this.getVehicles();
              }
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        } else {
          this.vehicleService.updateVehicle(vehicle, vehicle.vehicle_id).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('El vehiculo fue actulizada con exito');
              if(vehicle.imageUpload) {
                this.uploadImage(vehicle.imageUpload, vehicle.vehicle_id);
              } else {
                this.getVehicles();
              }
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        }
      }
    });
  }

  uploadImage(imageUpload: File, id: string): void {
    this.fileUploadService
    .updateFile(imageUpload, 'vehicles', id)
    .then(img => {
        this.getVehicles();
      })
      .catch (error => {
        this.facadeService.toast.error(error.msg);
      })
  }

  delete(vehicle: Vehicle): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si';
    modalModel.title = `${this.status ? 'Eliminar Vehículo' : 'Activar Vehículo'}`;
    modalModel.body = `¿Desea ${this.status ? 'eliminar' : 'activar'} el vehiculo ${vehicle.brand.brandVehicle} ${vehicle.model.vehicleModel}?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        let data;
        vehicle.status === StatusVehicleEnum.ACTIVE ?
        data = { ...vehicle, status: StatusVehicleEnum.DISABLED } as Vehicle :
        data = { ...vehicle, status: StatusVehicleEnum.ACTIVE } as Vehicle

        this.vehicleService.updateVehicle(data, data.vehicle_id).subscribe({
          next: (resp) => {
            this.getVehicles();
            this.facadeService.toast.success('El estato del vehiculo fue actualizado con exito');
          },
          error: (err) => {
            this.facadeService.toast.error(err.error.msg);
          }
        });
      }
    });
  }

  private getBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (resp) => {
        this.brands = resp.brandVehicles;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getTypeVehicles(): void {
    this.typeVehicleService.getTypeVehicles().subscribe({
      next: (resp) => {
        this.typeVehicles = resp.typeVehicles;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
