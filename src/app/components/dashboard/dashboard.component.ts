import { Component, OnInit } from '@angular/core';
import { ISubMenu } from 'src/app/common/interfaces/menu.interface';
import { SidebarService } from 'src/app/common/services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public sidebarService: SidebarService) {}

  ngOnInit(): void {
  }

}
