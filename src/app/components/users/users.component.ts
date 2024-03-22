import { Component, ElementRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/common/models/user.model';
import { UserService } from 'src/app/common/services/user.service';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from '../base.component';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { TypeRoleUserEnum } from 'src/app/common/constant/enums.constant';
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
  status!: boolean;
  urlParams = {} as IUrlParams;

  constructor(
    private userService: UserService,
    private modal: BsModalService,
    private toast: ToastrService,
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
      this.getUsers();
    });
  }

  getUsers(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term,
      status: this.status
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
    this.goTo(APPROUTES.users, this.urlParams);
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

  changeStatus(): void {
    this.urlParams.status = this.status;
    this.goTo(APPROUTES.users, this.urlParams);
  }

  delete(user: User): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si';
    modalModel.title = `${this.status ? 'Eliminar Usuario' : 'Activar Usuario'}`;
    modalModel.body = `¿Desea ${this.status ? 'eliminar' : 'activar'} el usuario ${user.firstName} ${user.lastName}?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        const data = { ...user, status: !user.status } as User;

        this.userService.updateUser(data).subscribe({
          next: (resp) => {
            this.getUsers();
            this.facadeService.toast.success('El estato del usuario fue actualizado con exito');
          },
          error: (err) => {
            this.facadeService.toast.error(err.error.msg);
          }
        });
      }
    });
  }

  changeRole(user: User): void {
    this.userService.changeRole(user).subscribe({
      next: (resp) => {
        this.toast.success('Rol de usuario actualizdo');
      },
      error: (err) => {
        this.toast.error(err.error.msg);
      }
    })
  }

  get typeRole() {
    return TypeRoleUserEnum;
  }
}
