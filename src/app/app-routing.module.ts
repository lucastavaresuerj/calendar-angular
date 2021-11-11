import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { WebCalendarComponent } from './pages/web-calendar/web-calendar.component';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  {
    path: '',
    component: WebCalendarComponent,
    canActivate: [AuthenticationService],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
