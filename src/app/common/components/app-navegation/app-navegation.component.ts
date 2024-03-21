import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { FacadeService } from '../../services/facade.service';
import { BaseComponent } from 'src/app/components/base.component';

@Component({
  selector: 'app-navegation',
  templateUrl: './app-navegation.component.html'
})
export class AppNavegationComponent extends BaseComponent implements OnInit {

  @Input() btnHidden!: boolean;
  @Input() buttonName!: string;
  @Input() icon!: string;

  @Output() whenSave = new EventEmitter<boolean>();

  isValidFormNav = false;

  constructor(
    private location: Location,
    private utils: UtilsService,
    facadeService: FacadeService,
    elementRef: ElementRef
  ) {
    super(facadeService, elementRef);
  }

  ngOnInit(): void {
    this.utils.whenFormIsValid$.subscribe((value) => {
      this.isValidFormNav = value;
    });
  }

  save(): void {
    this.whenSave.emit(true);
  }

}
