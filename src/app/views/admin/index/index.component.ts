import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-admin',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [MessageService]
})
export class IndexComponent {
  items: MenuItem[] = [];
  username: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: 'dashboard'
      },
      {
        label: 'Reservations',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'View All',
            icon: 'pi pi-fw pi-search',
            routerLink: 'reservations/'
          },
          {
            label: 'Cancel Requests',
            icon: 'pi pi-fw pi-user-minus',
            routerLink: 'reservations/cancel'
          },
        ]
      },
      {
        label: 'Packages',
        icon: 'pi pi-fw pi-file-edit',
        items: [
          {
            label: 'View All',
            icon: 'pi pi-fw pi-search',
            routerLink: 'packages/all'
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-minus',
            routerLink: 'packages/new'
          },
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      }
    ];

    this.username = this.sessionService.getUser().username;
  }

  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
