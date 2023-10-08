import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { UserService } from 'src/app/common/services/user.service';
import { Router } from '@angular/router';
import { APPROUTES } from '../../constant/app-routes.constant';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private router: Router) {
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }
}
