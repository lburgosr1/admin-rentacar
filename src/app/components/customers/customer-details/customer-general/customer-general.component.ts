import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AppModalEditOrNewContactComponent } from 'src/app/common/components/app-modals/edit-or-new-contact/app-modal-edit-or-new-contact.component';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { ITab } from 'src/app/common/components/app-tabs/tab';
import { CustomersService } from 'src/app/common/services/customer.service';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from 'src/app/components/base.component';
import { CustomerModel } from '../../customer';
import { Customer } from 'src/app/common/models/cusotmer.model';
import { IAddress } from 'src/app/common/interfaces/address.interface';
import { AppModalEditOrNewAddressComponent } from 'src/app/common/components/app-modals/edit-or-new-address/app-modal-edit-or-new-address.component';
import { User } from 'src/app/common/models/user.model';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';
import { IContact } from 'src/app/common/interfaces/contact.interface';
import { IUrlParams } from 'src/app/common/constant/url-params';

@Component({
  selector: 'app-customer-general',
  templateUrl: './customer-general.component.html',
  styleUrls: ['./customer-general.component.css']
})
export class CustomerGeneralComponent extends BaseComponent implements OnInit {

  form!: FormGroup;
  customer!: Customer;
  isEdit!: boolean;
  activeTabIndex!: number;
  tabs!: ITab[];
  agents!: User[];
  urlParams = {} as IUrlParams;

  constructor(
    private customerService: CustomersService,
    private fb: FormBuilder,
    private modal: BsModalService,
    private toastr: ToastrService,
    facadeService: FacadeService,) {
    super(facadeService);
  }

  ngOnInit(): void {
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.urlParams = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
    });

    this.activeTabIndex = 0;
    this.customer = new CustomerModel();
    this.formInit();
    this.getAgents();
    this.suscriptions();

    if (this.urlParams.customerId) {
      this.getCustomerDetails(this.urlParams.customerId);
    }
  }

  suscriptions(): void {
    this.facadeService.utils.whenCLickSave$.subscribe((value) => {
      if (value) {
        this.editOrNewCustomer();
      }
    });

    this.form.valueChanges.subscribe(() => {
      if (this.urlParams.customerId) {
        this.facadeService.utils.isValidForm(this.form.value, this.originalModel, this.form.valid, true);
      } else {
        this.facadeService.utils.isValidForm(this.form.value, this.originalModel, this.form.valid);
      }
    });
  }

  getCustomerDetails(customerId: string): void {
    this.startLoading();
    this.customerService.getCustomer(customerId).subscribe((customer) => {
      this.customer = customer;
      this.formEdit();
    });
  }

  getAgents(): void {
    this.facadeService.user.getAgents().subscribe({
      next: (agent) => {
        this.agents = agent.users;
      }
    })
  }

  formEdit(): void {
    this.form.patchValue({
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      document: this.customer.document,
      addresses: this.customer.addresses,
      contacts: this.customer.contacts,
      typeDocument: this.customer.typeDocument
    });
    this.originalModel = this.form.value as Customer;
    this.finishLoading();
  }

  formInit(): void {
    this.form = this.fb.group({
      firstName: [this.customer.firstName, Validators.required],
      lastName: [this.customer.lastName, Validators.required],
      document: [this.customer.document, Validators.required],
      addresses: [this.customer.addresses],
      contacts: [this.customer.contacts],
      typeDocument: [this.customer.typeDocument]
    });
  }

  editOrNewCustomer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let data;

    data = {
      firstName: this.facadeService.utils.camelCase(this.form.controls['firstName'].value.trim()),
      lastName: this.facadeService.utils.camelCase(this.form.controls['lastName'].value.trim()),
      document: this.form.controls['document'].value,
      addresses: this.form.controls['addresses'].value,
      contacts: this.form.controls['contacts'].value,
      typeDocument: this.form.controls['typeDocument'].value
    } as Customer;

    if (this.urlParams.isEdit) {
      this.customerService.updateCustomer(data, this.urlParams.customerId).subscribe({
        next: (resp) => {
          this.customer = resp;
          this.originalModel = this.form.value as Customer;
          this.toastr.success('El cliente fue actualizado con exito');
        },
        error: (err) => {
          this.toastr.error(err.error.msg);
        }
      })

    } else {
      this.customerService.createCustomer(data).subscribe({
        next: (resp) => {
          this.customer = resp.customer;
          this.originalModel = this.form.value as Customer;
          this.toastr.success('EL cliente fue agregado con exito');
        },
        error: (err) => {
          this.toastr.error(err.error.msg);
        }
      });
    }
  }

  editOrNew(contact?: any): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const initialState = {
      contact: contact
    };

    const modalRef = this.modal.show(AppModalEditOrNewContactComponent, { class: 'modal-dialog-centered', initialState });
    modalRef?.content?.whenClose.subscribe((contacts: any) => {
      if (contacts) {
        let isEdit = false;

        if (this.customer?.contacts?.length && (this.customer?.contacts[0]?.contacts.length || this.customer?.contacts[0]?.emails.length)) {
          for (let i = 0; i < this.customer?.contacts.length; i++) {
            if (this.customer.contacts[i]?._id === contacts?._id) {
              this.customer.contacts[i] = contacts;
              isEdit = true;
            }
          }
        }

        if (!isEdit) {
          if (!this.customer?.contacts) {
            this.customer.contacts = [];
          }
          this.customer.contacts.push(contacts);
          this.customer.contacts = this.customer.contacts.slice();
        }
      }
    });
  }

  onEditOrNewAddress(address?: IAddress): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const initialState = {
      address: address
    };

    const modalRef = this.modal.show(AppModalEditOrNewAddressComponent, { class: 'modal-dialog-centered', initialState });

    modalRef?.content?.whenClose.subscribe((addressEdit: IAddress) => {
      if (addressEdit) {
        let isEdit = false;

        if (this.customer?.addresses?.length) {
          for (let i = 0; i < this.customer?.addresses.length; i++) {
            if (this.customer.addresses[i]._id === addressEdit._id) {
              this.customer.addresses[i] = addressEdit;
              isEdit = true;
            }
          }
        }

        if (!isEdit) {
          if (!this.customer?.addresses) {
            this.customer.addresses = [];
          }
          this.customer.addresses.push(addressEdit);
          this.customer.addresses = this.customer.addresses.slice();
        }
      }
    });
  }

  deleteAddress(address: IAddress): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si, Eliminar';
    modalModel.title = `Eliminar Direccion`;
    modalModel.body = `¿Esta segur@ que desea eliminar esta direccion?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        if (!this.customer?.addresses) {
          this.customer.addresses = [];
          return
        }
        const addresses = this.customer.addresses.filter(a => a._id !== address._id);
        this.form.controls['addresses'].setValue(address);
        this.customer.addresses = addresses;
      }
    });
  }

  deleteContact(contact: IContact): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si, Eliminar';
    modalModel.title = `Eliminar Contacto`;
    modalModel.body = `¿Esta segur@ que desea eliminar este contacto?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        if (!this.customer?.contacts) {
          this.customer.contacts = [];
          return
        }
        const contacts = this.customer.contacts.filter(c => c._id !== contact._id);
        this.customer.contacts = contacts;
      }
    });
  }

}
