import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { InputTextModule } from 'primeng/inputtext';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { RippleModule } from 'primeng/ripple';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ReservationsComponent } from './reservations/reservations.component';

@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    SettingsComponent,
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

    ButtonModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    InputTextModule,
    TieredMenuModule,
    RippleModule,
  ]
})
export class AdminModule { }
