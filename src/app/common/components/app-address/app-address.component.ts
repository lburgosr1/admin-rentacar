import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IAddress, TypeAddress } from '../../interfaces/address.interface';

@Component({
  selector: 'app-address',
  templateUrl: './app-address.component.html',
  styleUrls: ['./app-address.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppAddressComponent implements OnChanges {

  @Input() addresses!: any[];
  @Input() isCompany!: boolean;
  @Output() onEditOrNew = new EventEmitter<IAddress>();
  @Output() onDelete = new EventEmitter<IAddress>();
  isCollapsed = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['addresses'].currentValue) {
      this.addresses = changes['addresses'].currentValue;
    } else {
      this.addresses = changes['addresses'].previousValue;
    }
  }

  collapsedAddress(isCollapsed: boolean): void {
    this.isCollapsed = !isCollapsed;
  }

  translateTypeAddress(type: string): string {
    return TypeAddress.Home === type ? 'Residencial' :
      TypeAddress.Office === type ? 'Oficina' : '';
  }

  editOrNewAddress(address?: any): void {
    this.onEditOrNew.emit(address);
  }

  deleteAddress(address: any): void {
    this.onDelete.emit(address);
  }

  formatAddress(address: IAddress): string {
    return `${address.street}, ${address.number ? 'No. ' + address.number + ',' : ''}
            ${address.sector ? address.sector + ',' : ''}
            ${address.city ? address.city : ''}`
  }
}
