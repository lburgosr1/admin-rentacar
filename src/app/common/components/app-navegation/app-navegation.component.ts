import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-navegation',
  templateUrl: './app-navegation.component.html'
})
export class AppNavegationComponent implements OnInit {

  @Input() btnHidden!: boolean;
  @Input() buttonName!: string;

  @Output() whenSave = new EventEmitter<boolean>();

  isValidForm = false;

  constructor(
    private location: Location,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.utils.whenFormIsValid$.subscribe((value) => {
      this.isValidForm = value;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.whenSave.emit(true);
  }

}
