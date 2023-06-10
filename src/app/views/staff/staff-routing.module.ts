import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexStaffComponent } from './index/index.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: '', component: IndexStaffComponent, canActivate: [],
    canActivateChild: [AuthGuard, RoleGuard],  data: { expectedRole: ["admin", "staff"] },
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
