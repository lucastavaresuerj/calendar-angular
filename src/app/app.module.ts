import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { SigninComponent } from './pages/signin/signin.component';
import { WebCalendarComponent } from './pages/web-calendar/web-calendar.component';
import { AuthenticationService } from './services/authentication.service';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DirectivesModuleModule } from './bootstrap/directives/directives-module.module';
import { DayService } from './services/day.service';
import { LeftPainelComponent } from './components/left-painel/left-painel.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

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
  providers: [AuthenticationService, DayService],
  bootstrap: [AppComponent],
})
export class AppModule {}
