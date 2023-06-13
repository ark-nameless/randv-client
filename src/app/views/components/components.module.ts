import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';
import { ViewPackagesComponent } from './view-packages/view-packages.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InjectHTMLDirective } from 'src/app/directives/inject-html.directive';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { SetCheckinComponent } from './set-checkin/set-checkin.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    CheckAvailabilityComponent,
    ViewPackagesComponent,
    SetCheckinComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    DirectivesModule,

    CarouselModule,
    TagModule,
    ButtonModule,
    CardModule,
    ToastModule,
    InputTextModule,
    KeyFilterModule,
    CalendarModule,
    DropdownModule,


  ],
  exports: [
    CheckAvailabilityComponent,
    ViewPackagesComponent,
    SetCheckinComponent,
  ]
})
export class ComponentsModule { }
