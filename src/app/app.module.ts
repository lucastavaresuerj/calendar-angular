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

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    SigninComponent,
    WebCalendarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BootstrapComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
