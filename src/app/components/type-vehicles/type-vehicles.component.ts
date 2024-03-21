import { Component, ElementRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from '../base.component';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';
import { TypeVehicle } from 'src/app/common/models/type-vehicle.model';
import { TypeVehicleService } from 'src/app/common/services/type-vehicle.service';
import { AppModalTypeVehicleDetailsComponent } from 'src/app/common/components/app-modals/app-modal-type-vehicle-details/app-modal-type-vehicle-details.component';

@Component({
  selector: 'app-type-vehicles',
  templateUrl: './type-vehicles.component.html',
  styleUrls: ['./type-vehicles.component.css']
})
export class TypeVehiclesComponent extends BaseComponent implements OnInit {
  typeVehicles!: TypeVehicle[];
  pagination!: IPagination;
  txtTerm: string = '';
  status!: boolean;
  urlParams = {} as IUrlParams;

  constructor(
    private typeVehicleService: TypeVehicleService,
    private modal: BsModalService,
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
      this.getTypeVehicles();
    });
  }

  getTypeVehicles(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term,
      status: this.status
    } as any;

    const paramsURL = new URLSearchParams(params);

    this.typeVehicleService.getTypeVehicles(`${paramsURL}`).subscribe({
      next: (resp) => {
        this.typeVehicles = resp.typeVehicles;
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
    this.getTypeVehicles();
  }

  search(): void {
    this.urlParams.term = this.txtTerm;
    this.goTo(APPROUTES.typeVehicles);
  }

  clearSearch(): void {
    if (!this.txtTerm) {
      return;
    }
    this.txtTerm = '';
    this.urlParams.term = '';
    this.goTo(APPROUTES.typeVehicles);
  }

  changeStatus(): void {
    this.urlParams.status = this.status;
    this.goTo(APPROUTES.typeVehicles, this.urlParams);
  }

  createTypeVehicle(typeVehicle?: TypeVehicle): void {
    let initialState;
    let isEdit = typeVehicle ? true : false;

    if (typeVehicle) {
      initialState = {
        type: typeVehicle,
        isEdit
      };
    } else {
      const typeVehicle = {} as TypeVehicle;
      initialState = {
        type: typeVehicle,
        isEdit
      };
    }

    const modalRef = this.modal.show(AppModalTypeVehicleDetailsComponent, { class: 'modal-dialog-centered', initialState });
    modalRef?.content?.whenClose.subscribe((typeVehicle: TypeVehicle) => {
      if (typeVehicle) {
        if (!isEdit) {
          this.typeVehicleService.createTypeVehicle(typeVehicle).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('El Tipo Vehículo fue agregada con exito');
              this.getTypeVehicles();
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        } else  {
          this.typeVehicleService.updateTypeVehicle(typeVehicle, typeVehicle.type_vehicle_id).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('El Tipo Vehículo fue actulizada con exito');
              this.getTypeVehicles();
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        }
      }
    });
  }

  delete(typeVehicle: TypeVehicle): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si';
    modalModel.title = `${this.status ? 'Eliminar Tipo Vehículo' : 'Activar Tipo Vehículo'}`;
    modalModel.body = `¿Desea ${this.status ? 'eliminar' : 'activar'} ${typeVehicle.typeVehicle}?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        const data = { ...typeVehicle, status: !typeVehicle.status } as TypeVehicle;

        this.typeVehicleService.updateTypeVehicle(data, data.type_vehicle_id).subscribe({
          next: (resp) => {
            this.getTypeVehicles();
            this.facadeService.toast.success('El estato del Tipo Vehículo fue actualizado con exito');
          },
          error: (err) => {
            this.facadeService.toast.error(err.error.msg);
          }
        });
      }
    });
  }
}
