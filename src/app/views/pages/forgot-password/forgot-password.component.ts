import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/apis/users.service';
import SendPasswordResetModel from 'src/app/models/send-password-reset.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [MessageService,]
})
export class ForgotPasswordComponent {
  passwordResetInfo: SendPasswordResetModel = new SendPasswordResetModel();
  formGroup: FormGroup = new FormGroup({
    email: new FormControl<string | null>(''),
  });

  constructor(
    private router: Router,
    private messageService: MessageService, 
    private userService: UsersService,
  ) {

  }

  onSubmit() {
    this.passwordResetInfo.email = this.formGroup.controls['username'].value;
    
    this.userService.sentForgotPassword(this.passwordResetInfo).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Request Sent', detail: "Password Reset Request Sent" });
        setTimeout(() => this.router.navigate(['/']), 2000);
      }
    )
  }
}
