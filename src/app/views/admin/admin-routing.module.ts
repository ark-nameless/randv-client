import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';
import { BasePackagesComponent } from './packages/base-packages/base-packages.component';
import { NewPackageComponent } from './packages/new-package/new-package.component';
import { AllPackagesComponent } from './packages/all-packages/all-packages.component';
import { AllReservationsComponent } from './reservations/all-reservations/all-reservations.component';
import { CancelRequestsComponent } from './reservations/cancel-requests/cancel-requests.component';
import { ViewCancelRequestComponent } from './reservations/view-cancel-request/view-cancel-request.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'packages', redirectTo: 'packages/all', pathMatch: 'full' },
  {
    path: '', component: IndexComponent, canActivate: [],
    canActivateChild: [RoleGuard, AuthGuard], data: { expectedRole: ['admin'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'packages', component: BasePackagesComponent, 
        canActivateChild: [RoleGuard, AuthGuard], data: { expectedRole: ['admin'] },
        children: [
          { path: 'all', component: AllPackagesComponent },
          { path: 'new', component: NewPackageComponent },
        ]
      },
      { path: 'reservations', component: ReservationsComponent, 
        canActivateChild: [RoleGuard, AuthGuard], data: { expectedRole: ['admin'] },
        children: [
          { path: '', component: AllReservationsComponent },
          { path: 'cancel', component: CancelRequestsComponent },
          { path: 'cancel/:id', component: ViewCancelRequestComponent },
        ]
      },
      // { path: 'reservations', component: ReservationsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
