import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-staff',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [MessageService]
})
export class IndexStaffComponent {
  items: MenuItem[] = [];
  username: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
    private messageService: MessageService,
  ) 
  { }

  ngOnInit() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logout();
            }
          },
        ]
      },
    ];

    this.username = this.sessionService.getUser().username;
  }

  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
