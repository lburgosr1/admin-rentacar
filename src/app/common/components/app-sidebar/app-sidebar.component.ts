import { Component } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { UserService } from 'src/app/common/services/user.service';
import { SidebarService } from '../../services/sidebar.service';
import { GeneratePDFService } from '../../services/generate-pdf.service';
import { APPROUTES } from '../../constant/app-routes.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css']
})
export class AppSidebarComponent {

  user: User;

  constructor(private userService: UserService, private pdfService: GeneratePDFService, public sidebarService: SidebarService) {
    this.user = userService.user;
  }

  logout() {
    this.userService.logout();
  }

  report(): void {
    this.pdfService.generatePDF({}, APPROUTES.reports).subscribe({
      next: (resp) => {
        const file = new Blob([resp], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    });
  }

}
