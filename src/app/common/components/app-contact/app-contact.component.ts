import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IContact, TypeContact } from '../../interfaces/contact.interface';
import { BaseComponent } from 'src/app/components/base.component';
import { FacadeService } from '../../services/facade.service';

@Component({
  selector: 'app-contact',
  templateUrl: './app-contact.component.html',
  styleUrls: ['./app-contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppContactComponent extends BaseComponent implements OnChanges {

  @Input() contacts!: any[];
  @Input() isCompany!: boolean;
  @Output() onEditOrNew = new EventEmitter<IContact>();
  @Output() onDelete = new EventEmitter<any>();

  constructor(facadeservice: FacadeService) {
    super(facadeservice)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contacts'].currentValue) {
      this.contacts = changes['contacts'].currentValue;
    } else {
      this.contacts = changes['contacts'].previousValue;
    }
  }

  collapsedContact(index: number): void {
    this.contacts[index].isCollapsed = !this.contacts[index].isCollapsed;
  }

  translateTypeContact(type: string): string {
    return TypeContact.Home === type ? 'Residencial' :
      TypeContact.Office === type ? 'Oficina' :
        TypeContact.CellPhone === type ? 'Celular' : '';
  }

  deleteContact(contact: any): void {
    this.onDelete.emit(contact);
  }

  editOrNewContact(contact?: any): void {
    this.onEditOrNew.emit(contact);
  }
}
