import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { BookComponent } from './book/book.component';
import { CancelReservationComponent } from './cancel-reservation/cancel-reservation.component';
import { PackagesComponent } from './packages/packages.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  {
    path: '', component: IndexComponent, canActivate: [],
    children: [
      { path: 'landing-page', component: LandingPageComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'book', component: BookComponent },
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
