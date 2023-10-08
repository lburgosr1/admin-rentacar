import { Component, OnInit } from '@angular/core';
import { IMenu, ISubMenu } from 'src/app/common/interfaces/menu.interface';
import { SidebarService } from 'src/app/common/services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: IMenu[] = [];

  constructor(public sidebarService: SidebarService) { }

  ngOnInit(): void {
    for (const item of this.sidebarService.menu) {
      if (item.title !== 'Dashboard') {
        this.items.push(item)
      }
    }
  }
}
