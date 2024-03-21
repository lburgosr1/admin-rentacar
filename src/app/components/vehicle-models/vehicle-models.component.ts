import { Component, ElementRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from '../base.component';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';
import { VehicleModel } from 'src/app/common/models/vehicle-model.model';
import { VehicleModelService } from 'src/app/common/services/vehicle-model.service';
import { AppModalVehicleModelDetailsComponent } from 'src/app/common/components/app-modals/app-modal-vehicle-model-details/app-modal-vehicle-model-details.component';
import { BrandVehicleService } from 'src/app/common/services/brand-vehicle.service';
import { BrandVehicle } from 'src/app/common/models/brand-vehicle.model';

@Component({
  selector: 'app-brand-vehicles',
  templateUrl: './vehicle-models.component.html',
  styleUrls: ['./vehicle-models.component.css']
})
export class VehicleModelsComponent extends BaseComponent implements OnInit {
  vehicleModels!: VehicleModel[];
  brands!: BrandVehicle[];
  pagination!: IPagination;
  txtTerm: string = '';
  status!: boolean;
  urlParams = {} as IUrlParams;

  constructor(
    private vehicleModelService: VehicleModelService,
    private modal: BsModalService,
    private brandService: BrandVehicleService,
    facadeService: FacadeService,
    elementRef: ElementRef) {
    super(facadeService, elementRef);
  }

  ngOnInit(): void {
    this.pagination = new Pagination();
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.urlParams = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
      this.urlParams.term ? this.txtTerm = this.urlParams.term : '';
      this.urlParams?.status ? this.status = this.urlParams.status :
        this.urlParams?.status === undefined ? this.status = true :
          this.status = false;
      this.urlParams?.page ? this.urlParams.page : this.urlParams.page = this.pagination.page;
      this.getVehicleModels();
    });
    this.getBrands();
  }

  getVehicleModels(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term,
      status: this.status
    } as any;

    const paramsURL = new URLSearchParams(params);

    this.vehicleModelService.getVehicleModels(`${paramsURL}`).subscribe({
      next: (resp) => {
        this.vehicleModels = resp.vehicleModels;
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
    this.getVehicleModels();
  }

  search(): void {
    this.urlParams.term = this.txtTerm;
    this.goTo(APPROUTES.vehicleModels);
  }

  clearSearch(): void {
    if (!this.txtTerm) {
      return;
    }
    this.txtTerm = '';
    this.urlParams.term = '';
    this.goTo(APPROUTES.vehicleModels);
  }

  changeStatus(): void {
    this.urlParams.status = this.status;
    this.goTo(APPROUTES.vehicleModels, this.urlParams);
  }

  createVehicleModel(vehicleModel?: VehicleModel): void {
    let initialState;
    let isEdit = vehicleModel ? true : false;

    if (vehicleModel) {
      initialState = {
        model: vehicleModel,
        brands: this.brands,
        isEdit
      };
    } else {
      const vehicleModel = {} as VehicleModel;
      initialState = {
        model: vehicleModel,
        brands: this.brands,
        isEdit
      };
    }

    const modalRef = this.modal.show(AppModalVehicleModelDetailsComponent, { class: 'modal-dialog-centered', initialState });
    modalRef?.content?.whenClose.subscribe((vehicleModel: VehicleModel) => {
      if (vehicleModel) {
        if (!isEdit) {
          this.vehicleModelService.createVehicleModel(vehicleModel).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('El Tipo Vehículo fue agregada con exito');
              this.getVehicleModels();
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        } else  {
          this.vehicleModelService.updateVehicleModel(vehicleModel, vehicleModel._id).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('El Tipo Vehículo fue actulizada con exito');
              this.getVehicleModels();
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        }
      }
    });
  }

  delete(vehicleModel: VehicleModel): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si';
    modalModel.title = `${this.status ? 'Eliminar El Modelo' : 'Activar El Modelo'}`;
    modalModel.body = `¿Desea ${this.status ? 'eliminar el modelo' : 'activar el modelo'} ${vehicleModel.vehicleModel}?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        const data = { ...vehicleModel, status: !vehicleModel.status } as VehicleModel;

        this.vehicleModelService.updateVehicleModel(data, data.vehicle_model_id).subscribe({
          next: (resp) => {
            this.getVehicleModels();
            this.facadeService.toast.success('El estato del Modelo fue actualizado con exito');
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
}
