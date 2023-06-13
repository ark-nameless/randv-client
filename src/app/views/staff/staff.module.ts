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
import { ReservationsComponent } from './reservations/reservations.component';
import { AllReservationsComponent } from './reservations/all-reservations/all-reservations.component';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    IndexStaffComponent,
    DashboardComponent,
    ReservationsComponent,
    AllReservationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    StaffRoutingModule,
    ComponentsModule,

    ButtonModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    InputTextModule,
    TieredMenuModule,
    RippleModule,
    CardModule,
    ToastModule,
    ConfirmDialogModule,
    ContextMenuModule,
    TableModule,
    MultiSelectModule,
    
    
  ]
})
export class StaffModule { }
