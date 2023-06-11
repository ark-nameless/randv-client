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
  topMenu: MenuItem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.topMenu = [
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

    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: 'dashboard'
      },
      {
        label: 'Accomodations',
        icon: 'pi pi-fw pi-home',
        routerLink: 'accomodations'
      },
      {
        label: 'Entrace Fees',
        icon: 'pi pi-fw pi-home',
        routerLink: 'entrace'
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
        label: 'Feedbacks',
        icon: 'pi pi-fw pi-comments',
        items: [
          {
            label: 'All Reviews',
            icon: 'pi pi-fw pi-book',
            routerLink: 'feedbacks/reviews'
          },
          {
            label: 'All Comments',
            icon: 'pi pi-fw pi-envelope',
            routerLink: 'feedbacks/comments'
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
    ];

    this.username = this.sessionService.getUser().username;
  }

  logout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
