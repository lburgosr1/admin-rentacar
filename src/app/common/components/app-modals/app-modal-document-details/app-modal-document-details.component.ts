import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Document } from 'src/app/common/models/document.model';

@Component({
  templateUrl: './app-modal-document-details.component.html',
  styleUrls: ['../modal.component.css']
})
export class AppModalDocumentDetailsComponent implements OnInit {

  @Input() document!: Document;
  @Input() isEdit!: boolean;
  @Output() whenClose = new EventEmitter<Document>();
  form!: FormGroup;

  constructor(
    private modalRef: BsModalRef,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.isEdit) {
      this.setForm();
    }
  }

  accept(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    const data = {...this.form.value, document_id: this.document.document_id};
    this.whenClose.next(data);
    this.modalRef.hide();
  }

  cancel(): void {
    this.modalRef.hide();
  }

  private setForm(): void {
    this.form.patchValue({
      typeDocument: this.document.typeDocument
    });
    this.cdr.markForCheck();
  }

  private initForm(): void {
    this.form = this.fb.group({
      typeDocument: ['', Validators.required]
    });
  }

  get typeDocument() {
    return this.form.get('typeDocument');
  }
}
