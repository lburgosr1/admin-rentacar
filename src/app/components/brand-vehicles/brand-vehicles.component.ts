import { Component, ElementRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from '../base.component';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';
import { BrandVehicle } from 'src/app/common/models/brand-vehicle.model';
import { AppModalBrandVehicleDetailsComponent } from 'src/app/common/components/app-modals/app-modal-brand-vehicle-details/app-modal-brand-vehicle-details.component';
import { BrandVehicleService } from 'src/app/common/services/brand-vehicle.service';

@Component({
  selector: 'app-brand-vehicles',
  templateUrl: './brand-vehicles.component.html',
  styleUrls: ['./brand-vehicles.component.css']
})
export class BrandVehiclesComponent extends BaseComponent implements OnInit {
  brandVehicles!: BrandVehicle[];
  pagination!: IPagination;
  txtTerm: string = '';
  status!: boolean;
  urlParams = {} as IUrlParams;

  constructor(
    private brandVehicleService: BrandVehicleService,
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
      this.getBrandVehicles();
    });
  }

  getBrandVehicles(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term,
      status: this.status
    } as any;

    const paramsURL = new URLSearchParams(params);

    this.brandVehicleService.getBrands(`${paramsURL}`).subscribe({
      next: (resp) => {
        this.brandVehicles = resp.brandVehicles;
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
    this.getBrandVehicles();
  }

  search(): void {
    this.urlParams.term = this.txtTerm;
    this.goTo(APPROUTES.brandVehicles);
  }

  clearSearch(): void {
    if (!this.txtTerm) {
      return;
    }
    this.txtTerm = '';
    this.urlParams.term = '';
    this.goTo(APPROUTES.brandVehicles);
  }

  changeStatus(): void {
    this.urlParams.status = this.status;
    this.goTo(APPROUTES.brandVehicles, this.urlParams);
  }

  createBrandVehicle(brandVehicle?: BrandVehicle): void {
    let initialState;
    let isEdit = brandVehicle ? true : false;

    if (brandVehicle) {
      initialState = {
        brand: brandVehicle,
        isEdit
      };
    } else {
      const brandVehicle = {} as BrandVehicle;
      initialState = {
        brand: brandVehicle,
        isEdit
      };
    }

    const modalRef = this.modal.show(AppModalBrandVehicleDetailsComponent, { class: 'modal-dialog-centered', initialState });
    modalRef?.content?.whenClose.subscribe((brandVehicle: BrandVehicle) => {
      if (brandVehicle) {
        if (!isEdit) {
          this.brandVehicleService.createBrand(brandVehicle).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('El Tipo Vehículo fue agregada con exito');
              this.getBrandVehicles();
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        } else  {
          this.brandVehicleService.updateBrand(brandVehicle, brandVehicle._id).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('La Marca fue actulizada con exito');
              this.getBrandVehicles();
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        }
      }
    });
  }

  delete(brandVehicle: BrandVehicle): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si';
    modalModel.title = `${this.status ? 'Eliminar La Marca' : 'Activar La Marca'}`;
    modalModel.body = `¿Desea ${this.status ? 'eliminar la marca' : 'activar la marca'} ${brandVehicle._id}?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        const data = { ...brandVehicle, status: !brandVehicle.status } as BrandVehicle;

        this.brandVehicleService.updateBrand(data, data._id).subscribe({
          next: (resp) => {
            this.getBrandVehicles();
            this.facadeService.toast.success('El estato de la marca fue actualizado con exito');
          },
          error: (err) => {
            this.facadeService.toast.error(err.error.msg);
          }
        });
      }
    });
  }
}
