import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Modal, IModalCustomMessage } from '../modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coin } from 'src/app/common/models/coin.model';

@Component({
  templateUrl: './app-modal-coin-details.component.html',
  styleUrls: ['../modal.component.css']
})
export class AppModalCoinDetailsComponent implements OnInit {

  @Input() coin!: Coin;
  @Input() isEdit!: boolean;
  @Output() whenClose = new EventEmitter<Coin>();
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
    const data = {...this.form.value, coin_id: this.coin.coin_id};
    this.whenClose.next(data);
    this.modalRef.hide();
  }

  cancel(): void {
    this.modalRef.hide();
  }

  private setForm(): void {
    this.form.patchValue({
      symbol: this.coin.symbol,
      coinName: this.coin.coinName
    });
    this.cdr.markForCheck();
  }

  private initForm(): void {
    this.form = this.fb.group({
      symbol: ['', Validators.required],
      coinName: ['', Validators.required]
    });
  }

  get symbol() {
    return this.form.get('symbol');
  }

  get coinName() {
    return this.form.get('coinName');
  }
}
