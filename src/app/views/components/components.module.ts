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

@NgModule({
  declarations: [
    CheckAvailabilityComponent,
    ViewPackagesComponent,
  ],
  imports: [
    CommonModule,

    DirectivesModule,

    CarouselModule,
    TagModule,
    ButtonModule,
    CardModule,
  ],
  exports: [
    CheckAvailabilityComponent,
    ViewPackagesComponent,
  ]
})
export class ComponentsModule { }
