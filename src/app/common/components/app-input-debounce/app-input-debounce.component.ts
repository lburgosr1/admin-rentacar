import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
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

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  term!: string;
  debouncer: Subject<string> = new Subject();
  paramsUrl = {} as IUrlParams;

  constructor(facadeService: FacadeService) {
    super(facadeService);
  }

  ngOnInit() {
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.paramsUrl = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
      this.paramsUrl ? this.paramsUrl.policy : '';
    });

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
