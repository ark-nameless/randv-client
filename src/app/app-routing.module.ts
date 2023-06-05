import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { ForgotPasswordComponent } from './views/pages/forgot-password/forgot-password.component';
import { AppComponent } from './app.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  // { path: '', pathMatch: "full", component: AppComponent },
  { path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule) },
  { path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule) },
  { path: 'staff', loadChildren: () => import('./views/staff/staff.module').then(m => m.StaffModule) },
  // General Pages 
  { path: 'login', pathMatch: "full", component: LoginComponent, canActivate:[LoginGuard] },
  { path: 'forgot-password', pathMatch: "full", component: ForgotPasswordComponent, canActivate:[LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
