import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import LoginModel from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginInfo: LoginModel = new LoginModel();
  formGroup: FormGroup = new FormGroup({
    username: new FormControl<string | null>(''),
    password: new FormControl<string | null>('')
  });

  onSubmit() {
    this.loginInfo.username = this.formGroup.controls['username'].value;
    this.loginInfo.password = this.formGroup.controls['password'].value;

    console.log(this.loginInfo);
  }
}
