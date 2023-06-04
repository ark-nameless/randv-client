import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import SendPasswordResetModel from 'src/app/models/send-password-reset.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  passwordResetInfo: SendPasswordResetModel = new SendPasswordResetModel();
  formGroup: FormGroup = new FormGroup({
    email: new FormControl<string | null>(''),
  });

  onSubmit() {
    this.passwordResetInfo.email = this.formGroup.controls['username'].value;

    console.log(this.passwordResetInfo);
  }
}
