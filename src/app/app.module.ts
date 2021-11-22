import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService, DayService } from './services';

import { AppRoutingModule } from './app-routing.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { DirectivesModuleModule } from './bootstrap/directives/directives-module.module';

import { AppComponent } from './app.component';
import { DayComponent } from './components/day/day.component';
import { LoginComponent } from './pages/login/login.component';
import { PageComponent } from './components/page/page.component';
import { DaysComponent } from './components/days/days.component';
import { SigninComponent } from './pages/signin/signin.component';
import { EventComponent } from './components/event/event.component';
import { HeaderComponent } from './components/header/header.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { WebCalendarComponent } from './pages/web-calendar/web-calendar.component';
import { LeftPainelComponent } from './components/left-painel/left-painel.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    SigninComponent,
    WebCalendarComponent,
    LoginComponent,
    HeaderComponent,
    LeftPainelComponent,
    DatepickerComponent,
    DaysComponent,
    DayComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BootstrapModule,
    DirectivesModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    AuthenticationService,
    DayService,
    { provide: LOCALE_ID, useValue: 'pt-PT' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
