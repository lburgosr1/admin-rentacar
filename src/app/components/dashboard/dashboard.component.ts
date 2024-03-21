import { Component, OnInit } from '@angular/core';
import { APPROUTES } from 'src/app/common/constant/app-routes.constant';
import { IMenu, ISubMenu } from 'src/app/common/interfaces/menu.interface';
import { SidebarService } from 'src/app/common/services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: any[] = [];

  constructor(public sidebarService: SidebarService) { }

  ngOnInit(): void {
    if (this.sidebarService && this.sidebarService?.menu.length) {
      this.sidebarService.menu.forEach((item: IMenu) => {
        if (item.url !== APPROUTES.dashboard && item.title !== 'Administración' && item.title !== 'Vehículo') {
          this.items.push(item)
        }

        if (item.submenu && item.submenu.length) {
          for (let itemSub of item.submenu) {
            if (itemSub.url === APPROUTES.users) {
              this.items.push(itemSub);
            } else if (itemSub.url === APPROUTES.vehicles) {
              this.items.push(itemSub);
            }
          }
        }
      });
    }
  }
}
