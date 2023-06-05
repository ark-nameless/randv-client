import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './views/pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckAvailabilityComponent } from './views/component/check-availability/check-availability.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UnAuthorizedInterceptor } from './interceptors/un-authorized.interceptor';
import { InjectHTMLDirective } from './directives/inject-html.directive';


@NgModule({
  declarations: [
    AppComponent,
    CheckAvailabilityComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnAuthorizedInterceptor,
      multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
