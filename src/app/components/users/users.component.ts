import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/common/models/user.model';
import { UserService } from 'src/app/common/services/user.service';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from '../base.component';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { Router } from '@angular/router';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { TypeRoleUser } from 'src/app/common/constant/enums.constant';
import { IUrlParams } from 'src/app/common/constant/url-params';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent extends BaseComponent implements OnInit {

  users!: User[];
  pagination!: IPagination;
  txtTerm: string = '';
  urlParams = {} as IUrlParams;

  constructor(
    private userService: UserService,
    private modal: BsModalService,
    private toast: ToastrService,
    facadeService: FacadeService) {
    super(facadeService);
  }

  ngOnInit(): void {
    this.pagination = new Pagination();
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.urlParams = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
      this.urlParams.term ? this.txtTerm = this.urlParams.term : '';
      this.urlParams?.page ? this.urlParams.page : this.urlParams.page = this.pagination.page;
      this.getUsers();
    });
  }

  getUsers(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term
    } as any;

    const paramsURL = new URLSearchParams(params);

    this.userService.getUsers(`${paramsURL}`).subscribe({
      next: (resp) => {
        this.users = resp.users;
        this.pagination.totalRecord = resp.total;
        this.finishLoading();
      }
    });
  }

  pageChanged(event: any) {
    this.urlParams.page = event.page;
    this.getUsers();
  }

  search(): void {
    this.urlParams.term = this.txtTerm;
    this.goTo(APPROUTES.users);
  }

  newUser(): void {
    this.goTo(APPROUTES.register);
  }

  clearSearch(): void {
    if (!this.txtTerm) {
      return;
    }
    this.txtTerm = '';
    this.urlParams.term = '';
    this.goTo(APPROUTES.users);
  }

  delete(user: User): void {
    const modalModel = new Modal();

    if (user.user_id === this.userService.userId) {
      modalModel.buttonTextCancel = 'Ok';
      modalModel.title = `Mensaje`;
      modalModel.body = `No puede eliminarse asi mismo`;
    } else {
      modalModel.buttonTextCancel = 'Cancelar';
      modalModel.buttonTextConfirmation = 'Si, Eliminar';
      modalModel.title = `Eliminar Usuario`;
      modalModel.body = `¿Esta segur@ de que desea eliminar el usuario:  ${user.fullNameUser}?`;
    }
    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        this.userService.deleteUser(user).subscribe({
          next: (resp) => {
            this.toast.success(`Elimino el usuario ${user.fullNameUser}`);
            this.goTo(APPROUTES.users);
          },
          error: (err) => {
            this.toast.error(err.error.msg);
          }
        })
      }
    });
  }

  changeRole(user: User): void {
    this.userService.saveUser(user).subscribe({
      next: (resp) => {
        this.toast.success('Rol de usuario actualizdo');
      },
      error: (err) => {
        this.toast.error(err.error.msg);
      }
    })
  }

  get typeRole() {
    return TypeRoleUser;
  }
}
