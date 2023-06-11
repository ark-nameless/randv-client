import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/apis/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [MessageService, ]
})
export class ResetPasswordComponent {
  password = '';
  token = '';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService, 
    private userService: UsersService,
  ) {
    this.token = this.route.snapshot.params['id'];
  }

  onSubmit() {
    let payload = {
      password: this.password
    }
    
    this.userService.passwordReset(payload, this.token).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Password Reset', detail: "Password Successfully Reset" });
        setTimeout(() => this.router.navigate(['/login']), 2000);
      }
    )
  }

}
