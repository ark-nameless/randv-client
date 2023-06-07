import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { EditorModule } from 'primeng/editor';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { InputTextModule } from 'primeng/inputtext';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { RippleModule } from 'primeng/ripple';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InjectHTMLDirective } from 'src/app/directives/inject-html.directive';
import { QuillModule } from 'ngx-quill';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { KeyFilterModule } from 'primeng/keyfilter';


@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    SettingsComponent,
    ReservationsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    DirectivesModule,

    QuillModule.forRoot(),

    ButtonModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    InputTextModule,
    TieredMenuModule,
    RippleModule,
    EditorModule,
    CardModule,
    KeyFilterModule,
  ]
})
export class AdminModule { }
