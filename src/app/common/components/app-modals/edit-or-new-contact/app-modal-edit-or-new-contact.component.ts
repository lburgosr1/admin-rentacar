import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modal, IModalCustomMessage } from '../modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ICompanyContact, TypeContact } from 'src/app/common/interfaces/contact.interface';

@Component({
  templateUrl: './app-modal-edit-or-new-contact.component.html',
  styleUrls: ['../modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppModalEditOrNewContactComponent implements OnInit {

  @Input() contact!: ICompanyContact;
  @Input() isCompany!: boolean;
  @Output() whenClose = new EventEmitter<ICompanyContact>();
  form!: FormGroup;
  newEmail!: FormGroup;
  initEmailForm!: FormGroup;
  newContact!: FormGroup;
  initContactForm!: FormGroup;
  modal!: IModalCustomMessage;
  showAdditionalBody!: boolean;
  types = [TypeContact.CellPhone, TypeContact.Home, TypeContact.Office];
  departments = ['Cobros', 'Analista De Negocios', 'Gerente De Negocios', 'Fianzas', 'Tesoreria']

  constructor(private modalRef: BsModalRef, private cdr: ChangeDetectorRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.modal) {
      this.modal = new Modal();
    }

    if (this.modal.bodyAdditional === '') {
      this.showAdditionalBody = true;
    }

    this.inicilizeForm();
    if (this.contact) {
      this.inicializeContactForm();
      this.inicializeEmailForm();
    } else {
      this.addContact();
      this.addEmail();
    }
  }

  set(modal: IModalCustomMessage): void {
    this.modal = modal;
    this.cdr.markForCheck();
  }

  accept(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    if (this.contact) {
      const data = { ...this.form.value, _id: this.contact._id, isCollapsed: false };
      this.whenClose.emit(data);
    } else {
      const data = { ...this.form.value, isCollapsed: false };
      this.whenClose.emit(data);
    }
    this.modalRef.hide();
  }

  cancel(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addEmail() {
    this.newEmail = this.fb.group({
      email: ['', Validators.required],
      isPrimary: [false]
    });

    this.emailsArr.push(this.newEmail);
  }

  addContact() {
    this.newContact = this.fb.group({
      type: ['', Validators.required],
      contactNo: ['', Validators.required],
      extNo: [''],
      isPrimary: [false]
    });

    this.contactsArr.push(this.newContact);
  }

  deleteContact(index: number) {
    this.contactsArr.removeAt(index);
  }

  deleteEmail(index: number) {
    this.emailsArr.removeAt(index);
  }

  private inicilizeForm(): void {
    if (this.contact) {
      if (this.isCompany) {
        this.form = this.fb.group({
          firstName: [this.contact?.firstName, Validators.required],
          lastName: [this.contact?.lastName, Validators.required],
          department: [this.contact?.department, Validators.required],
          contacts: this.fb.array([]),
          emails: this.fb.array([]),
        });
      } else {
        this.form = this.fb.group({
          contacts: this.fb.array([], this.validateContact),
          emails: this.fb.array([])
        });
      }
    } else {
      if (this.isCompany) {
        this.form = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          department: ['', Validators.required],
          contacts: this.fb.array([]),
          emails: this.fb.array([])
        });
      } else {
        this.form = this.fb.group({
          contacts: this.fb.array([], this.validateContact),
          emails: this.fb.array([])
        });
      }
    }
  }

  private inicializeContactForm(): void {
    for (let contact of this.contact.contacts) {
      this.initContactForm = this.fb.group({
        type: [contact.type],
        contactNo: [contact.contactNo],
        extNo: [contact.extNo],
        isPrimary: [contact.isPrimary]
      });

      this.contactsArr.push(this.initContactForm);
    }
  }

  private inicializeEmailForm(): void {
    for (let email of this.contact.emails) {
      this.initEmailForm = this.fb.group({
        email: [email.email, Validators.required],
        isPrimary: [email.isPrimary]
      });

      this.emailsArr.push(this.initEmailForm);
    }
  }

  private validateContact(control: any): ValidationErrors | null {
    let check = 0;

    if (!control.controls.length) {
      check++;
    }

    if (check > 0) {
      return {
        noContact: true
      };
    }

    return null;
  }

  get emailsArr() {
    return this.form.get('emails') as FormArray;
  }

  get contactsArr() {
    return this.form.get('contacts') as FormArray;
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get department() {
    return this.form.get('department');
  }

  get type() {
    return this.form.get('type');
  }

  get contactNo() {
    return this.form.get('contactNo');
  }

  get extNo() {
    return this.form.get('extNo');
  }

  get email() {
    return this.form.get('email');
  }
}
