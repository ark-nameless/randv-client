import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import LoginModel from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { MessageService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent{
  loginInfo: LoginModel = new LoginModel();

  formGroup: FormGroup = new FormGroup({
    username: new FormControl<string | null>(''),
    password: new FormControl<string | null>('')
  });

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
  ){

  }

  onSubmit() {
    this.loginInfo.username = this.formGroup.controls['username'].value;
    this.loginInfo.password = this.formGroup.controls['password'].value;

    this.authService.login(this.loginInfo.username || '', this.loginInfo.password || '').subscribe(
      data => {
        const helper = new JwtHelperService();

        this.sessionService.saveAccessToken(data.access_token);
        this.sessionService.saveRefreshToken(data.refresh_token);

        const tokenInfo = helper.decodeToken(data.access_token).info

        this.sessionService.saveUser(tokenInfo)

        console.log(tokenInfo)
        console.log(typeof(tokenInfo.access))

        if (tokenInfo.access.includes("admin")) this.router.navigate(['/admin'])
        else if (tokenInfo.access.includes('staff')) this.router.navigate(['/staff'])
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Username/Password' });
      }
    )

    console.log(this.loginInfo);
  }
}
