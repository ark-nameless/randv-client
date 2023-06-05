import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { IndexStaffComponent } from './index/index.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    IndexStaffComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,

    ButtonModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    InputTextModule,
    TieredMenuModule,
    RippleModule,
  ]
})
export class StaffModule { }
