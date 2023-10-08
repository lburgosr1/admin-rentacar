import { Component } from '@angular/core';
import { SettingsService } from 'src/app/common/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {

  constructor( private settingsService: SettingsService  ) {}

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  changeTheme( theme: string ) {

    this.settingsService.changeTheme( theme );

  }

}
