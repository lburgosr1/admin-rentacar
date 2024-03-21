import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/common/services/customer.service';
import { SettingsService } from 'src/app/common/services/settings.service';
import { SidebarService } from 'src/app/common/services/sidebar.service';
import { VehicleService } from 'src/app/common/services/vehicle.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  year = new Date().getFullYear();

  constructor( private settingsService: SettingsService,
    private sidebarService: SidebarService) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.loadMenu();
  }
}
