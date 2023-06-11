import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { UsersService } from 'src/app/apis/users.service';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService, ConfirmationService, ConfirmationService, DialogService, ]
})
export class UsersComponent {

  users: any = [];
  cols: any = [];
  _selectedColumns: any = [];
  selectedUser: any = {};
  loading: boolean = true;

  items: MenuItem[] = [];

  ref: DynamicDialogRef = new DynamicDialogRef();
  
  constructor(
    private router: Router,
    private messageService: MessageService,
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
  ) {

  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.loading = false;
    });

    this.items = [
      { label: 'Toggle Active Status', icon: 'pi pi-fw pi-lock', command: () => this.toggleActiveStatus(this.selectedUser) },
      // { label: 'Check Out', icon: 'pi pi-fw pi-sign-out', command: () => this.setCheckOut(this.selectedReservation) },
      // { label: 'Paid', icon: 'pi pi-fw pi-money-bill', command: () => this.setPayment(this.selectedReservation) },
    ];

    this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'contact_no', header: 'Contact No' },
      { field: 'access', header: 'Permissions' },
      { field: 'is_active', header: 'Is Active' },
    ];

    this._selectedColumns = this.cols;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }



  clear(table: Table) {
    table.clear();
    this.usersService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  toggleActiveStatus(user: any) {
    console.log(user);
    this.usersService.toggleActiveStatus(user.id).subscribe(
      (data: any) => {
        user.is_active = data.is_active;
        this.messageService.add({ severity: 'success', summary: 'User Active Status', detail: "User " + user.username + " active status changed."});
      }
    )
  }

  newUser() {
    this.ref = this.dialogService.open(NewUserComponent, {
      header: 'Create New User',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.ref.onClose.subscribe((accomodation: any) => {
      if (accomodation) {
        this.users.push(accomodation);
        this.messageService.add({ severity: 'info', summary: 'User Added', detail: accomodation.username });
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

}
