import { Component, ElementRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { IPagination, Pagination } from 'src/app/common/models/paginate.model';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from '../base.component';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { AppModalDocumentDetailsComponent } from 'src/app/common/components/app-modals/app-modal-document-details/app-modal-document-details.component';
import { DocumentService } from 'src/app/common/services/document.service';
import { Document } from 'src/app/common/models/document.model';
import { Modal } from 'src/app/common/components/app-modals/modal';
import { AppModalCustomMessageComponent } from 'src/app/common/components/app-modals/custom-message/app-modal-custom-message.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent extends BaseComponent implements OnInit {
  documents!: Document[];
  pagination!: IPagination;
  txtTerm: string = '';
  status!: boolean;
  urlParams = {} as IUrlParams;

  constructor(
    private documentService: DocumentService,
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
      this.getDocuments();
    });
  }

  getDocuments(): void {
    this.startLoading();

    const params = {
      page: this.urlParams.page,
      count: this.pagination.count,
      term: this.urlParams.term ? this.urlParams.term : this.pagination.term,
      status: this.status
    } as any;

    const paramsURL = new URLSearchParams(params);

    this.documentService.getDocuments(`${paramsURL}`).subscribe({
      next: (resp) => {
        this.documents = resp.documents;
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
    this.getDocuments();
  }

  search(): void {
    this.urlParams.term = this.txtTerm;
    this.goTo(APPROUTES.documents);
  }

  clearSearch(): void {
    if (!this.txtTerm) {
      return;
    }
    this.txtTerm = '';
    this.urlParams.term = '';
    this.goTo(APPROUTES.documents);
  }

  changeStatus(): void {
    this.urlParams.status = this.status;
    this.goTo(APPROUTES.documents, this.urlParams);
  }

  createDocument(document?: Document): void {
    let initialState;
    let isEdit = document ? true : false;

    if (document) {
      initialState = {
        document,
        isEdit
      };
    } else {
      const document = {} as Document;
      initialState = {
        document,
        isEdit
      };
    }

    const modalRef = this.modal.show(AppModalDocumentDetailsComponent, { class: 'modal-dialog-centered', initialState });
    modalRef?.content?.whenClose.subscribe((document: Document) => {
      if (document) {
        if (!isEdit) {
          this.documentService.createDocument(document).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('El documento fue agregada con exito');
              this.getDocuments();
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        } else  {
          this.documentService.updateDocument(document, document.document_id).subscribe({
            next: (resp) => {
              this.facadeService.toast.success('El documento fue actulizada con exito');
              this.getDocuments();
            },
            error: (err) => {
              this.facadeService.toast.error(err.error.msg);
            }
          });
        }
      }
    });
  }

  delete(document: Document): void {
    const modalModel = new Modal();

    modalModel.buttonTextCancel = 'Cancelar';
    modalModel.buttonTextConfirmation = 'Si';
    modalModel.title = `${this.status ? 'Eliminar Documento' : 'Activar Documento'}`;
    modalModel.body = `¿Desea ${this.status ? 'eliminar' : 'activar'} el documento ${document.typeDocument}?`;

    const modalRef = this.modal.show(AppModalCustomMessageComponent, { class: 'modal-dialog-centered' });
    modalRef?.content?.set(modalModel);
    modalRef?.content?.whenClose.subscribe((result: boolean) => {
      if (result) {
        const data = { ...document, status: !document.status } as Document;

        this.documentService.updateDocument(data, data.document_id).subscribe({
          next: (resp) => {
            this.getDocuments();
            this.facadeService.toast.success('El estato del documento fue actualizado con exito');
          },
          error: (err) => {
            this.facadeService.toast.error(err.error.msg);
          }
        });
      }
    });
  }
}
