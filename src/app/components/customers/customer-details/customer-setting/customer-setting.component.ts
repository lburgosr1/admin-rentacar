import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ITab, Tab } from 'src/app/common/components/app-tabs/tab';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { IUrlParams } from 'src/app/common/constant/url-params';
import { CustomersService } from 'src/app/common/services/customer.service';
import { FacadeService } from 'src/app/common/services/facade.service';
import { BaseComponent } from 'src/app/components/base.component';

@Component({
  selector: 'app-customer-setting',
  templateUrl: './customer-setting.component.html',
  styleUrls: ['./customer-setting.component.css']
})
export class CustomerSettingComponent extends BaseComponent implements OnInit {

  isEdit!: boolean;
  activeTabIndex!: number;
  tabs!: ITab[];
  validForm!: boolean;
  btnHidden!: boolean;
  urlParams = {} as IUrlParams;
  private generalTab!: Tab;

  constructor(
    private router: Router,
    private customerService: CustomersService,
    facadeService: FacadeService) {
    super(facadeService);
  }

  ngOnInit(): void {
    this.facadeService.activatedRoute.queryParams.subscribe((params: any) => {
      this.urlParams = this.facadeService.utils.transformParamsObj(params) as IUrlParams;
    });
    this.urlParams.customerId ? this.isEdit = true : this.isEdit = false;

    this.setTabs();

    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.tabsChanges();
      }
    });
  }

  tabNavigation(tab: ITab): void {
    const index = this.tabs.findIndex((x) => x.route === tab.route);
    if (index !== undefined) {

      this.tabs[index].active = true;
      this.goTo(this.tabs[index].route, this.urlParams);
    }
  }

  validateAndGoStep(): void {
    if(!this.validForm && !this.urlParams.customerId) {
      return;
    }
    this.goToTab();
  }

  goToTab(): void {
    const customer = this.customerService.customer;

    if(!customer) {
      return;
    }

    if(this.route.url === `/${APPROUTES.customerDetails}/${APPROUTES.general}`) {
      this.tabs[1].active = true;
      this.tabs[0].active = false;
      this.urlParams.isEdit = false;
      this.urlParams.agentId = customer.user as string;
      this.goTo(this.tabs[1].route, this.urlParams);
      this.route.url = `/${this.tabs[1].route}`;
    } else {
      this.tabs[0].active = true;
      this.tabs[1].active = false;
      this.goTo(this.tabs[0].route, this.urlParams);
      this.route.url = `/${this.tabs[0].route}`
    }
  }


  active(url: string): boolean {
    const route = this.facadeService.utils.rebuildRoute(this.facadeService.location.path());
    if (route.url.indexOf(url) > -1) {
      return true;
    }
    return false;
  }

  onSave(value: boolean): void {
    this.facadeService.utils.whenCLickSave$.next(value);
  }

  private setTabs(): void {
    this.generalTab = new Tab('General', `${APPROUTES.customerDetails}/${APPROUTES.general}`, false, false);
    this.tabs = [
      this.generalTab
    ];
    this.tabsChanges();
  }

  private tabsChanges(): void {
    if (this.tabs && this.tabs.length) {
      let tabNumber = 0;
      for (let i = 0; i < this.tabs.length; i++) {
        this.tabs[i].active = this.active(this.tabs[i].route);
        if (this.tabs[i].active === true) {
          this.activeTabIndex = tabNumber;
        }
        tabNumber++;
      }
    }
  }
}
