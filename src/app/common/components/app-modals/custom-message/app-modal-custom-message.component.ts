import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Modal, IModalCustomMessage } from '../modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './app-modal-custom-message.component.html',
  styleUrls: ['../modal.component.css']
})
export class AppModalCustomMessageComponent implements OnInit {

  modal!: IModalCustomMessage;
  public whenClose: Subject<boolean> = new Subject<boolean>();
  showAdditionalBody!: boolean;

  constructor(private modalRef: BsModalRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.modal) {
      this.modal = new Modal();
    }

    if (this.modal.bodyAdditional === '') {
      this.showAdditionalBody = true;
    }
  }

  accept(): void {
    this.whenClose.next(true);
    this.modalRef.hide();
  }

  cancel(): void {
    this.whenClose.next(false);
    this.modalRef.hide();
  }

  set(modal: IModalCustomMessage): void {
    this.modal = modal;
    this.cdr.markForCheck();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
