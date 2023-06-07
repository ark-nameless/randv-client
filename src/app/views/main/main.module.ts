import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { IndexComponent } from './index/index.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RippleModule } from 'primeng/ripple';
import { BookComponent } from './book/book.component';
import { CancelReservationComponent } from './cancel-reservation/cancel-reservation.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { PackagesComponent } from './packages/packages.component';
import { ComponentsModule } from '../components/components.module';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { CustomerInfoComponent } from './extras/customer-info/customer-info.component';
import { AccomodationInfoComponent } from './extras/accomodation-info/accomodation-info.component';
import { GuestEntraceInfoComponent } from './extras/guest-entrace-info/guest-entrace-info.component';
import { PaymentConfirmationComponent } from './extras/payment-confirmation/payment-confirmation.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';



@NgModule({
  declarations: [
    IndexComponent,
    LandingPageComponent,
    BookComponent,
    CancelReservationComponent,
    AboutUsComponent,
    ContactComponent,
    PackagesComponent,
    CustomerInfoComponent,
    AccomodationInfoComponent,
    GuestEntraceInfoComponent,
    PaymentConfirmationComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,

    ComponentsModule,

    DragDropModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    MenubarModule,
    RippleModule,
    TableModule,
    InputSwitchModule,
    ToastModule,
    OrderListModule,
    PickListModule,
    DataViewModule,
    RadioButtonModule,
    SliderModule,
    CardModule,
    StepsModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    KeyFilterModule,
    TabMenuModule,
    AccordionModule,
    TabViewModule,
    ImageModule,

  ]
})
export class MainModule { }
