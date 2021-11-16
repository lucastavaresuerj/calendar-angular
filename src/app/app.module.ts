import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { SigninComponent } from './pages/signin/signin.component';
import { WebCalendarComponent } from './pages/web-calendar/web-calendar.component';
import { AuthenticationService } from './services/authentication.service';
import { BootstrapComponentsModule } from './bootstrap-components/bootstrap-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DirectivesModuleModule } from './bootstrap-components/directives-module/directives-module.module';
import { DayService } from './services/day.service';
import { LeftPainelComponent } from './components/left-painel/left-painel.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    SigninComponent,
    WebCalendarComponent,
    LoginComponent,
    HeaderComponent,
    LeftPainelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BootstrapComponentsModule,
    DirectivesModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService, DayService],
  bootstrap: [AppComponent],
})
export class AppModule {}
