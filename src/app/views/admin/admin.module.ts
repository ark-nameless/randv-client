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
import { QuillModule } from 'ngx-quill';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { EditReservationComponent } from './components/edit-reservation/edit-reservation.component';
import { NewPackageComponent } from './packages/new-package/new-package.component';
import { AllPackagesComponent } from './packages/all-packages/all-packages.component';
import { BasePackagesComponent } from './packages/base-packages/base-packages.component';
import { CarouselModule } from 'primeng/carousel';
import { UsersComponent } from './users/users.component';
import { CancelRequestsComponent } from './reservations/cancel-requests/cancel-requests.component';
import { AllReservationsComponent } from './reservations/all-reservations/all-reservations.component';
import { ViewCancelRequestComponent } from './reservations/view-cancel-request/view-cancel-request.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { AllCommentsComponent } from './feedbacks/all-comments/all-comments.component';
import { AllReviewsComponent } from './feedbacks/all-reviews/all-reviews.component';
import { EntraceFeesComponent } from './entrace-fees/entrace-fees.component';
import { AccomodationsComponent } from './accomodations/accomodations.component';
import { CreateNewAccomodationComponent } from './accomodations/create-new-accomodation/create-new-accomodation.component';
import { NewEntraceFeeComponent } from './entrace-fees/new-entrace-fee/new-entrace-fee.component';


@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    SettingsComponent,
    ReservationsComponent,
    EditReservationComponent,
    NewPackageComponent,
    AllPackagesComponent,
    BasePackagesComponent,
    UsersComponent,
    CancelRequestsComponent,
    AllReservationsComponent,
    ViewCancelRequestComponent,
    FeedbacksComponent,
    AllCommentsComponent,
    AllReviewsComponent,
    EntraceFeesComponent,
    AccomodationsComponent,
    CreateNewAccomodationComponent,
    NewEntraceFeeComponent,
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
    TableModule,
    MultiSelectModule,
    ContextMenuModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CalendarModule,
    PanelMenuModule,
    CarouselModule,
    OverlayPanelModule,
    DynamicDialogModule,
    SelectButtonModule,
    

  ]
})
export class AdminModule { }
