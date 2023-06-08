import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { BookComponent } from './book/book.component';
import { CancelReservationComponent } from './cancel-reservation/cancel-reservation.component';
import { PackagesComponent } from './packages/packages.component';
import { CustomerInfoComponent } from './extras/customer-info/customer-info.component';
import { AccomodationInfoComponent } from './extras/accomodation-info/accomodation-info.component';
import { GuestEntraceInfoComponent } from './extras/guest-entrace-info/guest-entrace-info.component';
import { PaymentConfirmationComponent } from './extras/payment-confirmation/payment-confirmation.component';
import { BookPackageComponent } from './extras/book-package/book-package.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'book', redirectTo: 'book/customers', pathMatch: 'full' },
  {
    path: '', component: IndexComponent, canActivate: [],
    children: [
      { path: 'landing-page', component: LandingPageComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
      { 
        path: 'book', component: BookComponent,
        children: [
          { path: 'customers', component: CustomerInfoComponent },
          { path: 'accomodations', component: AccomodationInfoComponent },
          { path: 'guests', component: GuestEntraceInfoComponent },
          { path: 'payment', component: PaymentConfirmationComponent },
        ]
      },
      { path: 'book-package/:id', component: BookPackageComponent }, 
      { path: 'cancel', component: CancelReservationComponent },
      { path: 'packages', component: PackagesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
