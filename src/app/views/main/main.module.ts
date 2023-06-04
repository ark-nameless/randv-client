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

@NgModule({
  declarations: [
    IndexComponent,
    LandingPageComponent,
    BookComponent,
    CancelReservationComponent,
    AboutUsComponent,
    ContactComponent,
    PackagesComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,

    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    MenubarModule,
    RippleModule,
  ]
})
export class MainModule { }
