import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/common/services/settings.service';
import { SidebarService } from 'src/app/common/services/sidebar.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  year = new Date().getFullYear();

  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.loadMenu();
  }
}
