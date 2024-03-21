import { Component, ElementRef, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Coin } from 'src/app/common/models/coin.model';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FacadeService } from 'src/app/common/services/facade.service';
import { CoinsService } from 'src/app/common/services/coin.service';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';
import { AppModalCoinDetailsComponent } from 'src/app/common/components/app-modals/app-modal-coin-details/app-modal-coin-details.component';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent extends BaseComponent implements OnInit {
  coins!: Coin[];
  pagination!: IPagination;
  txtTerm: string = '';
  status!: boolean;
  urlParams = {} as IUrlParams;

  constructor(
    private coinService: CoinsService,
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
      this.getCoins();
    });
  }

  getCoins(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term,
      status: this.status
    } as any;

    const paramsURL = new URLSearchParams(params);

    this.coinService.getCoins(`${paramsURL}`).subscribe({
      next: (resp) => {
        this.coins = resp.coins;
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
    this.getCoins();
  }

  search(): void {
    this.urlParams.term = this.txtTerm;
    this.goTo(APPROUTES.coins);
  }

  clearSearch(): void {
    if (!this.txtTerm) {
      return;
    }
    this.txtTerm = '';
    this.urlParams.term = '';
    this.goTo(APPROUTES.coins);
  }

  changeStatus(): void {
    this.urlParams.status = this.status;
    this.goTo(APPROUTES.coins, this.urlParams);
  }

  createCoin(coin?: Coin): void {
    let initialState;
    let isEdit = coin ? true : false;

    if (coin) {
      initialState = {
        coin,
        isEdit
      };
    } else {
      const coin = {} as Coin;
      initialState = {
        coin,
        isEdit
      };
    }

    const modalRef = this.modal.show(AppModalCoinDetailsComponent, { class: 'modal-dialog-centered', initialState });
    modalRef?.content?.whenClose.subscribe((coin: Coin) => {
      if (coin) {
        if (!isEdit) {
          this.coinService.createCoin(coin).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('La moneda fue agregada con exito');
              this.getCoins();
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        } else  {
          this.coinService.updateCoin(coin, coin.coin_id).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('La moneda fue actulizada con exito');
              this.getCoins();
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        }
      }
    });
  }

  delete(coin: Coin): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si';
    modalModel.title = `${this.status ? 'Eliminar Monada' : 'Activar Moneda'}`;
    modalModel.body = `¿Desea ${this.status ? 'eliminar' : 'activar'} la moneda ${coin.coinName}?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        const data = { ...coin, status: !coin.status } as Coin;

        this.coinService.updateCoin(data, data.coin_id).subscribe({
          next: (resp) => {
            this.getCoins();
            this.facadeService.toast.success('El estato de la moneda fue actualizado con exito');
          },
          error: (err) => {
            this.facadeService.toast.error(err.error.msg);
          }
        });
      }
    });
  }
}
