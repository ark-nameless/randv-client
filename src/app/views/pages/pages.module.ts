import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,

    CheckboxModule,
    ButtonModule,
    InputTextModule,
    ImageModule,
    RippleModule,
    ToastModule,
  ]
})
export class PagesModule { }
