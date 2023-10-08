import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Branch, Currency, Status } from '../../constant/enums.constant';
import { User } from '../../models/user.model';
import { IUrlParams } from '../../constant/url-params';
import { FacadeService } from '../../services/facade.service';
import { BaseComponent } from 'src/app/components/base.component';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-filter',
  templateUrl: './app-filter.component.html',
  styleUrls: ['./app-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFilterComponent extends BaseComponent implements OnInit {

  @Input() isCollapseFilters!: boolean;
  @Input() companies!: Company[];
  @Input() agents!: User[];

  @Output() whenFilter = new EventEmitter<IUrlParams>();

  filter!: IUrlParams;
  branches = [
    Branch.Accidents,
    Branch.Advance,
    Branch.CollectiveLife,
    Branch.FieldOfComplianceOrExecution,
    Branch.Fire,
    Branch.HiddenVice,
    Branch.IndividualLife,
    Branch.TenderOrProposal,
    Branch.Travel,
    Branch.Vehicle
  ];
  status = [
    Status.All,
    Status.Active,
    Status.Cancelled
  ];
  currencys = [
    Currency.EUR,
    Currency.RD,
    Currency.US
  ]

  constructor(facaeService: FacadeService, private cdr: ChangeDetectorRef) {
    super(facaeService);
  }

  ngOnInit(): void {
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.filter = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
      this.setFilter();
    });
  }

  setFilter(): void {
    this.filter.companyId  ? this.filter.companyId : this.filter.companyId = '';
    this.filter.agentId ? this.filter.agentId : this.filter.agentId = '';
    this.filter.branch ? this.filter.branch : this.filter.branch = '';
    this.filter.policy ? this.filter.policy : this.filter.policy = '';
    this.filter.currency ? this.filter.currency: this.filter.currency = Currency.RD;
    this.filter.status ? this.filter.status : this.filter.status = Status.Active;
  }

  collapsedFilters(): void {
    this.isCollapseFilters = !this.isCollapseFilters;
  }

  clearFilters(): void {
    this.filter = {} as IUrlParams;
    this.collapsedFilters();
    this.whenFilter.emit(this.filter);
  }

  filterValue(): void {
    this.collapsedFilters();
    this.whenFilter.emit(this.filter);
  }
}
