import { Component, EventEmitter, Output, OnInit, Input, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { IUrlParams } from '../../constant/url-params';
import { BaseComponent } from 'src/app/components/base.component';
import { FacadeService } from '../../services/facade.service';

@Component({
  selector: 'app-input-debounce',
  templateUrl: './app-input-debounce.component.html',
  styleUrls: ['./app-input-debounce.component.css']
})
export class InputDebounceComponent extends BaseComponent implements OnInit {

  @Input() placeholder!: string;
  @Input() term!: string;

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  constructor(facadeService: FacadeService, elementRef: ElementRef) {
    super(facadeService, elementRef);
  }

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.onDebounce.emit(value);
      })
  }

  search() {
    this.onEnter.emit(this.term);
  }

  keyPress(event: any) {
    const value = event.target.value;
    this.onDebounce.emit(value);
  }
}
