import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { ForgotPasswordComponent } from './views/pages/forgot-password/forgot-password.component';

const routes: Routes = [
  // General Pages 
  { path: 'login', pathMatch: "full", component: LoginComponent },
  { path: 'forgot-password', pathMatch: "full", component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
