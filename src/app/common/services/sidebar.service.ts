import { Injectable } from '@angular/core';
import { IMenu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: IMenu[] = []

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
  }

  constructor() { }
}
