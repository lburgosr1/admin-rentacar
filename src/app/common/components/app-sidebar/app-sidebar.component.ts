import { Component } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { UserService } from 'src/app/common/services/user.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css']
})
export class AppSidebarComponent {

  user: User;

  constructor(private userService: UserService, public sidebarService: SidebarService) {
    this.user = userService.user;
  }

  logout() {
    this.userService.logout();
  }

}
