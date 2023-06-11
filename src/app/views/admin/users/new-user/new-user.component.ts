import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersService } from 'src/app/apis/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  user =  {
    username: "",
    email: "",
    password: "",
    access: []
  }

  accessOptions: any[] = [
    { name: 'Admin', value: 'admin' },
    { name: 'Staff', value: 'staff' },
  ];

  newAccomodation = {};

  constructor(
    private userService: UsersService, 
    public ref: DynamicDialogRef,
    private messageService: MessageService,
  ) {}

  ngOnInit() {

  }

  createNewUser() {
    this.userService.createNewUser(this.user).subscribe(
      (data: any) => {
        let val = {
          id: data.id,
          username: data.username,
          email: data.email,
          password: data.password,
          access: data.access,
          is_active: data.is_active,
          reset_token: data.reset_token
        };
        
        this.messageService.add({ severity: 'success', summary: 'User Added', detail: `${data.username} User Added.` });
        setTimeout(() => this.ref.close(val), 3000);
      }
    )
  }

}
